import './globals.css';
import { Inter } from 'next/font/google'
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

export const runtime = 'edge';

export const metadata: Metadata = {
  title: {
    default: 'iorin.io',
    template: '%s | iorin.io',
  },
  description: 'Hello World',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="ja">
        <body className={inter.className}>{children}</body>
      </html>
    )
  }