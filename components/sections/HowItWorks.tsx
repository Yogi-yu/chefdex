'use client';

import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';

const STEPS = [
  {
    number: '01',
    title: 'Chef Onboards',
    description:
      'A credentialed chef connects their professional identity to ChefDex. Worldchefs membership or verifiable accolades serve as the credential anchor.',
    color: 'gold',
  },
  {
    number: '02',
    title: 'ChefCoin Issued',
    description:
      'The chef issues a named coin on the ChefDex network. The coin supply, initial price, and distribution parameters are set at issuance.',
    color: 'gold',
  },
  {
    number: '03',
    title: 'Market Activates',
    description:
      'Diners, investors, and culinary institutions acquire ChefCoins. Market activity — trading volume, holder count, and coin adoption — drives the global ranking.',
    color: 'gold',
  },
  {
    number: '04',
    title: 'Restaurants Accept Payments',
    description:
      'Verified fine dining establishments integrate the ChefDex payment layer. Guests settle bills in USDC with a familiar, seamless checkout flow.',
    color: 'gold',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-charcoal-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Protocol Flow</SectionLabel>
          </motion.div>
          <motion.h2
            className="mt-5 text-4xl lg:text-5xl font-black tracking-tight text-charcoal-950 leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="mt-5 text-lg text-charcoal-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            A four-step protocol that connects chef reputation directly to market value.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-14 left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number circle */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-gold-200 flex items-center justify-center shadow-sm relative z-10">
                    <span className="text-lg font-black text-gold-600">{step.number}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="lg:hidden absolute top-1/2 left-full w-8 h-px bg-gold-200 transform -translate-y-1/2 hidden sm:block" />
                  )}
                </div>

                <h3 className="text-base font-bold text-charcoal-900 mb-3">{step.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          className="mt-20 bg-white rounded-2xl border border-charcoal-100 p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-6 shadow-sm"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-xl font-black text-charcoal-950 mb-2">
              The first unified protocol for culinary markets
            </h3>
            <p className="text-charcoal-500 text-sm leading-relaxed">
              ChefDex creates a network where every interaction — from a coin trade to a dinner
              reservation — strengthens both the chef&apos;s position and the dining ecosystem.
            </p>
          </div>
          <div className="flex-shrink-0 grid grid-cols-3 gap-6 lg:border-l lg:border-charcoal-100 lg:pl-10">
            {[
              { value: '$2.4M', label: 'Protocol TVL' },
              { value: '99.9%', label: 'Uptime' },
              { value: '< 3s', label: 'Settlement' },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-xl font-black text-charcoal-950">{metric.value}</div>
                <div className="text-xs text-charcoal-400 mt-0.5">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
