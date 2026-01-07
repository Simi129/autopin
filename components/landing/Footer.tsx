'use client';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: 'mailto:support@arjumedia.com' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Security', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-rose-500 to-orange-400 rounded-lg"></div>
              <span className="text-white font-semibold">AUTOPIN</span>
            </div>
            <p className="text-sm leading-relaxed">
              Automate your Pinterest marketing and grow your business effortlessly.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 Autopin. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-700">•</span>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}