"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { css } from "../../../../styled-system/css";
import { Kiwi_Maru } from "next/font/google";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

const containerCss = css({
	fontSize: {
		sm: "16px",
		base: "14px",
	},
	lineHeight: "24px",
	margin: "0 auto",
	maxWidth: "800px",
	padding: "24px",
	color: "#2F6F5E",
});

const markdownStyles = css({
	paddingLeft: "10px",
	"& h1": {
		fontSize: "28px",
		marginBottom: "16px",
		fontWeight: "bold",
	},
	"& h2": {
		fontSize: "24px",
		marginBottom: "12px",
		fontWeight: "bold",
	},
	"& h3": {
		fontSize: "20px",
		marginBottom: "8px",
		fontWeight: "bold",
	},
	"& h4, & h5": {
		fontSize: "18px",
		marginBottom: "8px",
		fontWeight: "bold",
	},
	"& p": {
		fontSize: "16px",
		marginBottom: "16px",
		lineHeight: "1.6",
		paddingLeft: "10px",
		"& img": {
			display: "block",
			margin: "16px auto",
			maxWidth: "100%",
			height: "auto",
		},
	},
	"& ul": {
		paddingLeft: "24px",
		listStyleType: "disc",
		marginBottom: "16px",
	},
	"& ol": {
		paddingLeft: "24px",
		listStyleType: "decimal",
		marginBottom: "16px",
	},
	"& a": {
		textDecoration: "underline",
		"&:hover": {},
	},
	"& pre": {
		backgroundColor: "#f5f5f5",
		padding: "16px",
		borderRadius: "8px",
		overflowX: "auto",
		marginBottom: "16px",
	},
	"& code": {
		fontFamily: "monospace",
		fontSize: "14px",
		backgroundColor: "#f5f5f5",
		padding: "4px 8px",
		borderRadius: "4px",
	},
	"& blockquote": {
		marginLeft: "16px",
		borderLeft: "4px solid #d0d7de",
		fontStyle: "italic",
		marginBottom: "16px",
	},
	"& table": {
		width: "100%",
		borderCollapse: "collapse",
		marginBottom: "16px",
	},
	"& th, & td": {
		border: "1px solid #d0d7de",
		padding: "8px",
		textAlign: "left",
	},
	"& th": {
		backgroundColor: "#f5f5f5",
		fontWeight: "bold",
	},
	"& img": {
		maxWidth: "100%",
		height: "auto",
		marginBottom: "16px",
		display: "block",
	},
	"& .contains-task-list": {
		listStyle: "none",
		paddingLeft: "0",
	},
	"& .task-list-item": {
		display: "flex",
		alignItems: "center",
		marginBottom: "8px",
	},
	"& .task-list-item input": {
		appearance: "none",
		width: "18px",
		height: "18px",
		borderRadius: "4px",
		marginRight: "8px",
		display: "inline-block",
		position: "relative",
		backgroundColor: "#e0e0e0",
		borderColor: "#a0a0a0",
		"&:checked": {
			backgroundColor: "#2F6F5E",
		},
		"&:checked::after": {
			content: '""',
			position: "absolute",
			top: "2px",
			left: "6px",
			width: "4px",
			height: "8px",
			border: "solid white",
			borderWidth: "0 2px 2px 0",
			transform: "rotate(45deg)",
		},
	},
	"& del": {
		textDecoration: "line-through",
	},
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
			<ReactMarkdown remarkPlugins={[remarkGfm]} className={markdownStyles}>
				{markdownContent}
			</ReactMarkdown>
		</motion.div>
	);
};

export default MarkdownRenderer;
