import { Poppins, Outfit } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
});

export const metadata = {
  title: 'ResumeAI - AI-Powered Resume Intelligence',
  description: 'AI-Powered Resume Intelligence for Modern Hiring Teams',
};

import { Providers } from './Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable}`}>
      <body className="font-outfit antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
