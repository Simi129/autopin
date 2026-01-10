import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUTOPIN - Pinterest Automation & Analytics SaaS",
  description: "The all-in-one platform to schedule pins, analyze trends, and grow your audience on Pinterest without the manual grind.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Pinterest Domain Verification */}
        <meta name="p:domain_verify" content="58a5f23109528182b52e8616c82ed76a" />
        
        <script src="https://code.iconify.design/3/3.1.0/iconify.min.js" async></script>
      </head>
      <body className="antialiased bg-slate-50 text-slate-600">
        {children}
      </body>
    </html>
  );
}