"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { css } from "../../../../styled-system/css";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "rehype-toc";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import { SiX } from "@icons-pack/react-simple-icons";

const markdownStyles = css({
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
		lineHeight: "2",
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
		lineHeight: "2",
		marginBottom: "16px",
	},
	"& ol": {
		paddingLeft: "24px",
		listStyleType: "decimal",
		lineHeight: "2",
	},
	"& a": {
		textDecoration: "underline",
		"&:hover": {},
		lineHeight: "2",
	},
	"& pre": {
		backgroundColor: "#f5f5f5",
		padding: "16px",
		borderRadius: "8px",
		overflowX: "auto",
		marginBottom: "16px",
		"& code": {
			padding: "0",
		},
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

const blogPageStyles = css({
	"& h1": {
		marginTop: "24px",
	},
	"& h2": {
		marginTop: "20px",
		marginLeft: "5px",
	},
	"& h3": {
		marginTop: "16px",
		marginLeft: "10px",
	},
	"& p": {
		paddingLeft: "10px",
		color: "#555",
	},
	"& a": {
		color: "#2F6F5E",
	},
	"& .toc": {
		border: "1px solid #e0e0e0",
		padding: "16px",
		borderRadius: "8px",
		marginBottom: "24px",
		backgroundColor: "#fffcf6",
		margin: "0 auto",
		maxWidth: "550px",
		"& ol": {
			listStyle: "none",
			paddingLeft: "15px",
			"& .toc-level": {
				marginBottom: "10px",
			},
			"& .toc-link-h1": {
				fontSize: "18px",
			},
			"& .toc-link-h2": {
				fontSize: "16px",
			},
			"& .toc-link-h3": {
				fontSize: "14px",
			},
		},
	},
	"& .toc:empty": {
		display: "none",
	},
	"& .toc ol:empty": {
		display: "none",
	},
	"& .toc:has(ol:empty)": {
		display: "none",
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
				const response = await fetch(`/article/${article}.md`);
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
				<div
					className={css({
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						marginRight: "10px",
					})}
				>
					{metadata.date && (
						<div>
							<p className={css({ fontSize: "14px", color: "#666" })}>
								{new Date(metadata.date).toLocaleDateString("ja-JP", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>
						</div>
					)}
					<div>
						<a
							href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${metadata.title} | @iorin__io`)}&url=${location.href}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Twitterでシェア"
							className={css({
								transition: "all 0.3s ease",
								"&:hover": {
									transform: "scale(1.1)",
								},
							})}
						>
							<SiX size={24} />
						</a>
					</div>
				</div>
			</div>

			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkToc]}
				rehypePlugins={[
					rehypeSlug,
					rehypeAutolinkHeadings,
					rehypeToc,
					[
						remarkRehype,
						{
							footnoteLabelTagName: "h1",
							footnoteLabel: "脚注",
						},
					],
				]}
				className={`${markdownStyles} ${blogPageStyles} ${css({ paddingLeft: "10px" })}`}
			>
				{markdownContent}
			</ReactMarkdown>
		</motion.div>
	);
};

export default MarkdownRenderer;
