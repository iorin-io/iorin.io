// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iorin.io',
  description: 'Hello World',
}


export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
  }: {
	children: React.ReactNode
  }) {
	return (
	  <html lang="ja">
		<body>{children}</body>
	  </html>
	)
  }