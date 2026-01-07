export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: January 7, 2026</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using this service, you accept and agree to be bound by the 
              terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-gray-700">
              Our service allows you to schedule and automatically publish pins to your 
              Pinterest account. We provide tools for content management and analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
            <p className="text-gray-700">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with Pinterest's Terms of Service</li>
              <li>Not use the service for any illegal purposes</li>
              <li>Not publish spam or inappropriate content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Pinterest Integration</h2>
            <p className="text-gray-700">
              By connecting your Pinterest account, you authorize us to access and manage 
              your Pinterest content on your behalf, within the scope of permissions you grant.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-700">
              We provide the service "as is" without warranties. We are not liable for any 
              damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to terminate or suspend your account at any time for 
              violations of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
            <p className="text-gray-700">
              We may modify these terms at any time. Continued use of the service after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
            <p className="text-gray-700">
              For questions about these Terms, contact us at:{" "}
              <a href="mailto:support@arjumedia.com" className="text-blue-600 hover:underline">
                support@arjumedia.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}