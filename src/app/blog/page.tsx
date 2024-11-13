"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
				setFileList(data.files as string[]); // データの型を明示
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
				<div>
					<h2>Markdown Files</h2>
					<ul>
						{fileList.map((file, index) => {
							const fileNameWithoutExt = file.replace(".md", "");
							return (
								<li key={index}>
									<a href={`/blog?article=${fileNameWithoutExt}`}>
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

export default MarkdownRenderer;
