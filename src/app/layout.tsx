import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { css } from "../../styled-system/css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "iorin-io",
	description: "iori's portfolio",
};

const background = css({
	backgroundColor: "#fffaf0",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} ${background}`}>{children}</body>
		</html>
	);
}
