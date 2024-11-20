import type { Metadata } from "next";
import "./globals.css";
import { css } from "../../styled-system/css";

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
		<html lang="ja">
			<body className={`${background}  ${css({ color: "#2F6F5E" })}`}>
				{children}
			</body>
		</html>
	);
}
