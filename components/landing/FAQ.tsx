'use client';

const faqs = [
  {
    q: 'How does the free beta period work?',
    a: 'Until February 1st, 2026, you get complete access to all Pinflow features at no cost. No credit card required, no hidden fees, no obligations. After the beta period ends, you can choose a plan that fits your needs or cancel anytime.',
  },
  {
    q: 'What happens after February 1st, 2026?',
    a: 'We\'ll notify you well in advance before the beta period ends. You\'ll have the option to choose from our paid plans starting from $19/month, or you can export your data and cancel. There will be no surprise charges.',
  },
  {
    q: 'Do you support multiple Pinterest accounts?',
    a: 'Absolutely! During the beta period, you can connect unlimited Pinterest accounts, making it easy to manage brands, clients, or personal projects all in one place.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We use bank-level encryption and never store your Pinterest passwords. We only request the minimum permissions needed to schedule pins. Your data is yours, and you can export or delete it anytime.',
  },
  {
    q: 'Can I invite my team during the beta?',
    a: 'Yes! Team collaboration features are fully available during the beta period. Invite as many team members as you need to work together on your Pinterest strategy.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-slate-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-slate-500">
          Everything you need to know about Pinflow.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details 
            key={idx} 
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-rose-200 transition-colors"
          >
            <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between text-slate-900 font-medium hover:bg-slate-50 transition-colors">
              {faq.q}
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}