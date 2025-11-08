import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// We can't use the hook here, so we will set a default and let pages update it.
export const metadata: Metadata = {
  title: 'Samet Valentino - Premium Berber Salonu',
  description: 'Samet Valentino ile stilinizi yeniden keşfedin. Premium saç kesimi, sakal tasarımı ve kişisel bakım hizmetleri için online randevu alın.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-body bg-background text-foreground antialiased`}>
       <FirebaseClientProvider>
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
       </FirebaseClientProvider>
      </body>
    </html>
  );
}
