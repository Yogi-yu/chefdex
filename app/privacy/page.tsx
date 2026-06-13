import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — ChefDex',
  description: 'ChefDex Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-black text-charcoal-950 mb-3">Privacy Policy</h1>
        <p className="text-charcoal-400 text-sm mb-12">Last updated: June 2024</p>

        <div className="prose prose-charcoal max-w-none">
          <p className="text-charcoal-600 leading-relaxed mb-8">
            ChefDex Protocol ("ChefDex", "we", "us", or "our") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and safeguard information
            when you visit our website or use our services.
          </p>

          {[
            {
              title: '1. Information We Collect',
              body: 'We may collect information you provide directly, such as your email address when signing up for updates. We also collect non-personal data automatically, including IP address, browser type, pages visited, and referral sources, to improve our services.',
            },
            {
              title: '2. How We Use Information',
              body: 'We use collected information to operate and improve the ChefDex platform, communicate protocol updates, analyze usage patterns, and comply with legal obligations. We do not sell personal information to third parties.',
            },
            {
              title: '3. On-Chain Data',
              body: 'Blockchain transactions are public by nature. Any interactions with the ChefDex protocol on-chain are recorded on the blockchain and are publicly accessible. We have no control over on-chain data visibility.',
            },
            {
              title: '4. Cookies and Tracking',
              body: 'We use essential cookies to operate the website and analytics cookies to understand usage. You may disable cookies through your browser settings, though this may affect site functionality.',
            },
            {
              title: '5. Third-Party Services',
              body: 'We may use third-party analytics and infrastructure providers. These providers operate under their own privacy policies and are bound by contractual data processing obligations.',
            },
            {
              title: '6. Data Retention',
              body: 'We retain personal data only as long as necessary to fulfill the purposes described in this policy or as required by law. You may request deletion of your personal data by contacting us.',
            },
            {
              title: '7. Your Rights',
              body: 'Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data. To exercise these rights, contact privacy@chefdex.io.',
            },
            {
              title: '8. Changes to This Policy',
              body: 'We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on this page with a new effective date.',
            },
            {
              title: '9. Contact Us',
              body: 'For privacy-related inquiries, contact privacy@chefdex.io.',
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
