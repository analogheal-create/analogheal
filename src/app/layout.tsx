import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'AnalogHeal Forensics | Expert Crypto & Digital Asset Recovery',
  description: 'Professional forensic recovery services for lost or stolen cryptocurrency and digital assets. Trusted worldwide with a 94% success rate.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30 selection:text-primary-foreground">
        {children}
        <Toaster />
        <Script id="tawk-setup" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          `}
        </Script>
        <Script 
          id="tawk-to" 
          src="https://embed.tawk.to/69dc8db265fbbc1c34b46a20/1jm2oj0sg"
          strategy="afterInteractive"
          crossOrigin="*"
        />
      </body>
    </html>
  );
}
