'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
import { exportDeckPdf } from '@/lib/exportPdf';

export default function ExportPdfButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await exportDeckPdf();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      data-pdf-exclude="true"
      onClick={handleExport}
      disabled={loading}
      className="fixed top-6 right-6 z-[60] inline-flex items-center gap-2 px-4 py-2.5 rounded-full
        bg-white border border-charcoal-200 shadow-md text-sm font-semibold text-charcoal-800
        hover:border-gold-400 hover:text-gold-700 hover:shadow-lg
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-colors duration-200 select-none"
      whileHover={{ scale: loading ? 1 : 1.05 }}
      whileTap={{ scale: loading ? 1 : 0.97 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      aria-label="Export deck as PDF"
    >
      {loading
        ? <Loader2 size={14} className="animate-spin text-gold-600" />
        : <Download size={14} />}
      {loading ? 'Exporting…' : 'Export PDF'}
    </motion.button>
  );
}
