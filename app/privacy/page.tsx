import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-display text-5xl tracking-wide text-text-primary mb-4">
          Privacy Policy<span className="text-crimson">.</span>
        </h1>
        <p className="font-sans text-sm text-text-muted mb-12">Last updated: March 2026</p>

        <div className="space-y-10 font-sans text-base text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">1. Data Controller</h2>
            <p>
              The data controller for this website is [Name / Company], [Address], Germany.
              Contact: contact@apextell.net
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">2. Data We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account data:</strong> Email address, hashed password, optional referral source</li>
              <li><strong>Usage data:</strong> IP address (stored in audit logs for security), timestamps of actions</li>
              <li><strong>Beta key data:</strong> Generated key, activation and expiry dates</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> collect poker hand histories, gameplay data, or any data from the ApexTell desktop application through this website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">3. Legal Basis (GDPR Art. 6)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contract performance (Art. 6(1)(b)):</strong> Processing account and beta key data to provide our service</li>
              <li><strong>Legitimate interest (Art. 6(1)(f)):</strong> Security logging (IP addresses in audit logs) to protect against unauthorized access</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> Optional analytics cookies (only if you opt in via the cookie banner)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">4. Cookies</h2>
            <p>
              We use <strong>essential cookies only</strong> by default (session authentication). Optional analytics cookies are only activated with your explicit consent via the cookie banner.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">5. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account data: retained until you delete your account</li>
              <li>Audit logs (IP addresses): retained for 90 days, then automatically purged</li>
              <li>Verification tokens: deleted after use or expiry</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">6. Your Rights (GDPR)</h2>
            <p>You have the following rights under the GDPR:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Right of access (Art. 15):</strong> Request a copy of your personal data</li>
              <li><strong>Right to rectification (Art. 16):</strong> Correct inaccurate data</li>
              <li><strong>Right to erasure (Art. 17):</strong> Delete your account and all personal data via Account Settings</li>
              <li><strong>Right to data portability (Art. 20):</strong> Receive your data in a machine-readable format</li>
              <li><strong>Right to withdraw consent (Art. 7(3)):</strong> Withdraw cookie consent at any time</li>
              <li><strong>Right to lodge a complaint:</strong> With your local data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">7. Data Requests</h2>
            <p>
              To exercise your rights, contact us at <a href="mailto:contact@apextell.net" className="text-crimson hover:underline">contact@apextell.net</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">8. Security</h2>
            <p>
              Passwords are hashed using bcrypt with a cost factor of 12. All data is transmitted over HTTPS. We do not store plaintext passwords.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">9. Third-Party Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Resend:</strong> Transactional email delivery (email address shared for sending verification and beta key emails)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">10. Changes</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page with an updated date.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
