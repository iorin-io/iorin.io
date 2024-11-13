"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { css } from "../../../styled-system/css";

const containerCss = css({
	margin: "0 auto",
	maxWidth: "800px",
	padding: "32px",
});

const h2css = css({
	fontSize: {
		sm: "32px",
		base: "20px",
	},
	marginTop: "32px",
	marginBottom: "16px",
	borderBottom: "2px solid #AFC9BF",
	paddingBottom: "8px",
});

const ulCss = css({
	paddingLeft: "20px",
	marginBottom: "16px",
	listStyleType: "none",
});

const liCss = css({
	marginBottom: "8px",
	fontSize: "16px",
});

const linkCss = css({
	textDecoration: "none",
	color: "#2F6F5E",
});

const MarkdownRenderer = () => {
	const [fileList, setFileList] = useState<string[]>([]);
	const [markdownContent, setMarkdownContent] = useState("");
	const searchParams = useSearchParams();
	const slug = searchParams.get("article");

	useEffect(() => {
		// URLのslugパラメータがあるか確認
		if (!slug) return;

		const fetchMarkdown = async () => {
			try {
				const response = await fetch(`/content/${slug}.md`);
				if (!response.ok) {
					throw new Error("Markdown file could not be fetched");
				}
				const text = await response.text();
				setMarkdownContent(text);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMarkdown();
	}, [slug]);

	useEffect(() => {
		const fetchFileList = async () => {
			try {
				const response = await fetch("/api/content-files");
				if (!response.ok) {
					throw new Error("Failed to fetch content files");
				}
				const data = await response.json();
				setFileList(data.files as string[]);
			} catch (error) {
				console.error(error);
			}
		};

		fetchFileList();
	}, []);

	return (
		<div>
			{markdownContent ? (
				<ReactMarkdown>{markdownContent}</ReactMarkdown>
			) : (
				<div className={containerCss}>
					<h2 className={h2css}>Markdown Files</h2>
					<ul className={ulCss}>
						{fileList.map((file, index) => {
							const fileNameWithoutExt = file.replace(".md", "");
							return (
								<li key={index} className={liCss}>
									<a
										href={`/blog?article=${fileNameWithoutExt}`}
										className={linkCss}
									>
										{fileNameWithoutExt}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<MarkdownRenderer />
		</Suspense>
	);
}
