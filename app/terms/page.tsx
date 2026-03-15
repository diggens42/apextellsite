import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <main className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-display text-5xl tracking-wide text-text-primary mb-4">
          Terms of Service<span className="text-crimson">.</span>
        </h1>
        <p className="font-sans text-sm text-text-muted mb-12">Last updated: March 2026</p>

        <div className="space-y-10 font-sans text-base text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">1. Scope</h2>
            <p>
              These Terms of Service govern your use of the ApexTell website (apextell.net) and
              the ApexTell Closed Beta program. By creating an account, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">2. Closed Beta Program</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Closed Beta provides free access to ApexTell during the testing phase</li>
              <li>Beta keys are personal and non-transferable</li>
              <li>We reserve the right to revoke beta access at any time</li>
              <li>Beta software may contain bugs and is provided &quot;as is&quot;</li>
              <li>Features may change or be removed during the beta period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">3. Account Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide a valid email address</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>One account per person; sharing accounts is not permitted</li>
              <li>You must be at least 18 years old to create an account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Reverse engineer, decompile, or disassemble the software</li>
              <li>Share, sell, or distribute your beta key</li>
              <li>Use the software in violation of any applicable poker site&apos;s terms of service</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">5. Intellectual Property</h2>
            <p>
              All content, software, and trademarks associated with ApexTell are the property of
              the operator. The Closed Beta does not grant any ownership rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">6. Limitation of Liability</h2>
            <p>
              ApexTell is provided &quot;as is&quot; during the beta period without warranty of any kind.
              We are not liable for any damages arising from the use of the software, including
              but not limited to losses incurred during poker play.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">7. Data Protection</h2>
            <p>
              Your personal data is processed in accordance with our{" "}
              <a href="/privacy" className="text-crimson hover:underline">Privacy Policy</a> and
              applicable data protection laws including the GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">8. Termination</h2>
            <p>
              You may delete your account at any time through Account Settings. We may
              terminate or suspend your access for violations of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Germany.
              The courts of [City], Germany have exclusive jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">10. Changes</h2>
            <p>
              We may update these terms from time to time. Continued use after changes
              constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
