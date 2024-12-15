export const runtime = "edge";
import { Suspense } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { css } from "../../../../styled-system/css";
import { Inknut_Antiqua, Kiwi_Maru } from "next/font/google";
import matter from "gray-matter";
import { type Metadata } from "next";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});
const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const containerCss = css({
	margin: "0 auto",
	maxWidth: "800px",
	padding: "32px",
});

const pageTitleCss = css({
	fontSize: {
		sm: "48px",
		base: "32px",
	},
	marginTop: "24px",
	marginBottom: "32px",
});

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { slug } = params;
	const response = await fetch(`https://iorin.io/article/${slug}.md`);
	if (!response.ok) {
		return {
			title: "記事が見つかりませんでした",
			description: "指定された記事が見つかりませんでした。",
			openGraph: {
				title: "記事が見つかりませんでした",
				description: "指定された記事が見つかりませんでした。",
				url: `https://iorin.io/blog/${slug}`,
				images: [
					{
						url: "https://iorin.io/images/default-ogp.png",
						width: 1200,
						height: 1200,
						alt: "Not found",
					},
				],
			},
		};
	}
	const text = await response.text();
	const { data } = matter(text);

	console.log(data);

	const title = `iorin.io | ${data?.title}`;
	const description = data?.description || "iorin.io blog";

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			url: `https://iorin.io/blog/${slug}`,
			images: [
				{
					url: "/deresquare.webp",
					width: 1200,
					height: 1200,
					alt: title,
				},
			],
			siteName: "iorin.io",
			locale: "ja_JP",
		},
		icons: {
			icon: [{ url: "https://iorin.io/deresquare.webp", rel: "icon" }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ["https://iorin.io/deresquare.webp"],
			creator: "@iorin__io",
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<>
			<div className={`${Kiwi400.className} ${containerCss}`}>
				<h1 className={`${pageTitleCss} ${Inknut400.className}`}>Blog</h1>
				<Suspense
					fallback={
						<div
							className={css({
								height: "70dvh",
								width: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							})}
						>
							<p>Loading...</p>
						</div>
					}
				>
					<MarkdownRenderer article={slug} />
				</Suspense>
			</div>
		</>
	);
}
