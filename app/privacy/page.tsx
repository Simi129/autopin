export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: January 7, 2026</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-gray-700">
              We collect information you provide directly to us when you create an account, 
              connect your Pinterest account, and use our service to schedule and publish pins.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Schedule and publish pins to your Pinterest account</li>
              <li>Send you technical notices and support messages</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Pinterest Integration</h2>
            <p className="text-gray-700">
              When you connect your Pinterest account, we access your Pinterest data through 
              the Pinterest API. We only access the permissions you explicitly grant us, 
              including the ability to create pins and access your boards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Storage</h2>
            <p className="text-gray-700">
              Your data is stored securely using Supabase. We implement appropriate technical 
              and organizational measures to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
            <p className="text-gray-700">
              We do not sell your personal information. We only share your information with 
              Pinterest to provide our services, and as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, update, or delete your personal information at 
              any time through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at:{" "}
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