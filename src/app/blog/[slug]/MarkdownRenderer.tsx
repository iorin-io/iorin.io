"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { css } from "../../../../styled-system/css";
import { Kiwi_Maru } from "next/font/google";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

const MarkdownRenderer = ({ article }: { article: string }) => {
	const [markdownContent, setMarkdownContent] = useState("");
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		const fetchMarkdown = async () => {
			try {
				const response = await fetch(`/blog/${article}.md`);
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
	}, [article]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isExiting ? 0 : 1 }}
			transition={{ duration: 0.5 }}
			className={`${Kiwi400.className} ${css({ color: "#2F6F5E" })}`}
		>
			<ReactMarkdown>{markdownContent}</ReactMarkdown>
		</motion.div>
	);
};

export default MarkdownRenderer;
