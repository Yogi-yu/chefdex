import { Twitter, Mail, FileText, Shield } from 'lucide-react';
import Image from 'next/image';

const FOOTER_LINKS = {
  Protocol: [
    { label: 'ChefCoin', href: '#chefcoin' },
    { label: 'Global Ranking', href: '#chefcoin' },
    { label: 'Crypto Payments', href: '#payments' },
    { label: 'Ecosystem', href: '#ecosystem' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Whitepaper', href: '/whitepaper' },
    { label: 'Worldchefs', href: '#worldchefs' },
    { label: 'FAQs', href: '/faq' },
  ],
  Company: [
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: 'mailto:hello@chefdex.io' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-5 group">
              <span className="flex-shrink-0 w-8 h-8 block">
                <Image src="/logo.jpg" alt="ChefDex" width={32} height={32} className="w-full h-full object-contain" />
              </span>
              <span className="font-bold text-white text-lg tracking-tight">ChefDex</span>
            </a>
            <p className="text-charcoal-400 text-sm leading-relaxed max-w-xs">
              The settlement layer for culinary reputation and premium dining payments. Built on-chain
              for institutional-grade trust.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://x.com/chefdex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-800 flex items-center justify-center text-charcoal-400 hover:text-white hover:bg-charcoal-700 transition-colors"
                aria-label="ChefDex on X (Twitter)"
              >
                <Twitter size={16} />
              </a>
              <a
                href="mailto:hello@chefdex.io"
                className="w-9 h-9 rounded-full bg-charcoal-800 flex items-center justify-center text-charcoal-400 hover:text-white hover:bg-charcoal-700 transition-colors"
                aria-label="Email ChefDex"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-charcoal-400 mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-charcoal-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-charcoal-500">
            &copy; {new Date().getFullYear()} ChefDex Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="/terms" className="flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-300 transition-colors">
              <FileText size={12} />
              Terms
            </a>
            <a href="/privacy" className="flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-300 transition-colors">
              <Shield size={12} />
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
