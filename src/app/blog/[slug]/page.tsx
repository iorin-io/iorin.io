export const runtime = "edge";
import { Suspense } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { css } from "../../../../styled-system/css";
import { Kiwi_Maru } from "next/font/google";
import matter from "gray-matter";
import { type Metadata } from "next";
import BlogTitle from "../../../components/BlogTitle";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

const containerCss = css({
	margin: "0 auto",
	maxWidth: "800px",
	padding: "32px",
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const response = await fetch(`https://iorin.io/article/${slug}.md`);
	if (!response.ok) {
		return {
			title: "iorin.io",
			description: "iorin.io's blog",
			openGraph: {
				title: "iorin.io",
				description: "iorin.io's blog",
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
	const description = data?.description || "iorin.io's blog";

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

	// const [isExiting, setIsExiting] = useState(false);

	return (
		<>
			<div className={`${Kiwi400.className} ${containerCss}`}>
				<BlogTitle />
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
