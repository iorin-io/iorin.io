"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { css } from "../../../../styled-system/css";
import { Inknut_Antiqua, Kiwi_Maru } from "next/font/google";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { containerCss, markdownStyles, pageTitleCss } from "@/const/css";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const MarkdownRenderer = ({ article }: { article: string }) => {
	const [markdownContent, setMarkdownContent] = useState("");
	const [metadata, setMetadata] = useState<{ title?: string; date?: string }>(
		{},
	);
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		const fetchMarkdown = async () => {
			try {
				const response = await fetch(`/blog/${article}.md`);
				if (!response.ok) {
					throw new Error("Markdown file could not be fetched");
				}
				const text = await response.text();
				const { content, data } = matter(text);
				setMarkdownContent(content);
				setMetadata(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMarkdown();
	}, [article]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isExiting ? 0 : 1 }}
			transition={{ duration: 0.5 }}
			className={`${Kiwi400.className} ${containerCss}`}
		>
			<h1 className={`${pageTitleCss} ${Inknut400.className}`}>Blog</h1>
			<div className={css({ marginBottom: "16px" })}>
				{metadata.title && (
					<h1
						className={css({
							fontSize: "28px",
							fontWeight: "bold",
							marginBottom: "10px",
						})}
					>
						{metadata.title}
					</h1>
				)}
				{metadata.date && (
					<p className={css({ fontSize: "14px", color: "#666" })}>
						{new Date(metadata.date).toLocaleDateString("ja-JP", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				)}
			</div>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				className={`${markdownStyles} ${css({ paddingLeft: "10px" })}`}
			>
				{markdownContent}
			</ReactMarkdown>
		</motion.div>
	);
};

export default MarkdownRenderer;
