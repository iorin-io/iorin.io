import type { Metadata } from "next";
import "./globals.css";
import { css } from "../../styled-system/css";

export const metadata: Metadata = {
	metadataBase: new URL("https://iorin.io"),
	title: "iorin-io",
	description: "iori's portfolio",
	openGraph: {
		title: "iorin-io",
		description: "iori's portfolio",
		type: "website",
		url: "https://iorin.io/",
		images: [
			{
				url: "/deresquare.webp",
				width: 1200,
				height: 1200,
				alt: "iorin-io OGP Image",
			},
		],
		siteName: "iorin.io",
		locale: "ja_JP",
	},
	twitter: {
		card: "summary_large_image",
		title: "iorin-io",
		description: "iori's portfolio",
		images: ["https://iorin.io/deresquare.webp"],
		creator: "@iorin__io",
	},
	icons: {
		icon: [{ url: "https://iorin.io/deresquare.webp", rel: "icon" }],
	},
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
