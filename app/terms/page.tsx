import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — ChefDex',
  description: 'ChefDex Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-black text-charcoal-950 mb-3">Terms of Service</h1>
        <p className="text-charcoal-400 text-sm mb-12">Last updated: June 2024</p>

        <div className="prose prose-charcoal max-w-none">
          <p className="text-charcoal-600 leading-relaxed mb-8">
            By accessing or using the ChefDex protocol, website, or any associated services, you
            agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          {[
            {
              title: '1. Acceptance of Terms',
              body: 'These Terms of Service ("Terms") govern your access to and use of the ChefDex platform, including all content, features, and functionality offered on or through chefdex.io. By using the Service, you confirm that you are at least 18 years old and have the legal authority to enter into these Terms.',
            },
            {
              title: '2. Description of Service',
              body: 'ChefDex is a Web3 protocol enabling culinary professionals to issue branded digital tokens ("ChefCoins") representing their market-validated reputation, and enabling fine dining establishments to accept stablecoin payments. The protocol is informational and non-custodial in nature.',
            },
            {
              title: '3. No Financial Advice',
              body: 'Nothing on this platform constitutes financial, investment, legal, or tax advice. ChefCoins are digital tokens; their value fluctuates and is not guaranteed. You are solely responsible for evaluating the risks associated with any digital asset transactions.',
            },
            {
              title: '4. User Conduct',
              body: 'You agree not to use the Service for any unlawful purpose, to violate any applicable laws, to infringe on intellectual property rights, or to interfere with the integrity of the protocol or its network participants.',
            },
            {
              title: '5. Intellectual Property',
              body: 'All content, trademarks, logos, and design elements associated with ChefDex are the property of ChefDex Protocol or its licensors. You may not reproduce or distribute any content without prior written consent.',
            },
            {
              title: '6. Limitation of Liability',
              body: 'ChefDex and its officers, directors, and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Use of this protocol is at your own risk.',
            },
            {
              title: '7. Modifications',
              body: 'We reserve the right to modify these Terms at any time. Continued use of the Service after modification constitutes your acceptance of the updated Terms.',
            },
            {
              title: '8. Contact',
              body: 'For questions about these Terms, contact us at legal@chefdex.io.',
            },
          ].map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="text-xl font-bold text-charcoal-900 mb-3">{section.title}</h2>
              <p className="text-charcoal-600 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
