/**
 * PDF export — slide-by-slide capture.
 *
 * Architecture:
 *   - Renders one slide at a time via PdfSlide (named export from PdfDeckDocument)
 *   - Container is fixed at 1200×849 px (landscape A4 ratio)
 *   - Each slide is captured independently → deterministic layout, no overflow
 *   - Output: landscape A4 PDF, one page per slide
 *
 * Flow:
 *   1. Create a hidden 1200×849 container off-screen
 *   2. createRoot into it
 *   3. For each slide index (0–11):
 *        a. render PdfSlide with that index
 *        b. wait for paint
 *        c. html2canvas → canvas
 *        d. add as landscape A4 PDF page
 *   4. Save PDF
 *   5. Unmount + remove container
 */
export async function exportDeckPdf(): Promise<void> {
  const [
    { default: React },
    { createRoot },
    { default: html2canvas },
    { jsPDF },
    pdfModule,
  ] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('html2canvas'),
    import('jspdf'),
    import('@/components/pdf/PdfDeckDocument'),
  ]);

  const { PdfSlide, SLIDE_COUNT } = pdfModule;

  /* ── 1. Create single-slide container (1200×849) ─────────── */
  const container = document.createElement('div');
  container.id = 'pdf-slide-root';
  Object.assign(container.style, {
    position: 'absolute',
    top:   '0',
    left:  '-9999px',
    width: '1200px',
    height:'849px',
    overflow: 'hidden',
    zIndex: '-1',
    pointerEvents: 'none',
    background: '#ffffff',
  });
  document.body.appendChild(container);

  const root = createRoot(container);

  /* Landscape A4 dimensions in mm */
  const A4_W = 297;
  const A4_H = 210;

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  try {
    for (let i = 0; i < SLIDE_COUNT; i++) {
      /* ── 2. Render this slide ──────────────────────────────── */
      root.render(React.createElement(PdfSlide, { slideIndex: i }));

      /* ── 3. Wait for React flush + browser paint ─────────── */
      await new Promise((r) => setTimeout(r, 400));

      /* ── 4. Capture the container (1200×849 fixed) ────────── */
      const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        width:  1200,
        height: 849,
      });

      /* ── 5. Add to PDF ────────────────────────────────────── */
      if (i > 0) pdf.addPage();
      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      /* Fill the entire landscape A4 page */
      pdf.addImage(imgData, 'JPEG', 0, 0, A4_W, A4_H, undefined, 'FAST');
    }

    pdf.save('ChefDex_Investor_Deck.pdf');
  } finally {
    /* ── 6. Always clean up ───────────────────────────────────── */
    root.unmount();
    if (container.parentNode) container.parentNode.removeChild(container);
  }
}
