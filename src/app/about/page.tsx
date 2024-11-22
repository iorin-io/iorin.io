"use client";

import { type ReactNode, useState } from "react";
import { css } from "../../../styled-system/css";
import { motion } from "framer-motion";
import { Inknut_Antiqua } from "next/font/google";
import { Kiwi_Maru } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import hobbyMd from "./md/hobby.md";
import careerMd from "./md/career.md";
import qualificationMd from "./md/qualification.md";

const profileCss = css({
	display: "flex",
	alignItems: "center",
	gap: {
		sm: "24px",
		base: "16px",
	},
	marginBottom: "24px",
});

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const Kiwi400 = Kiwi_Maru({
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

interface InViewPortAppearanceProp {
	children: ReactNode;
}

const aboutPageStyles = css({
	"& h2": {
		borderBottom: "2px solid #AFC9BF",
	},
	"& div": {
		marginBottom: "32px",
	},
});
const InViewPortAppearance: React.FC<InViewPortAppearanceProp> = ({
	children,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			viewport={{ once: true, amount: 0.2 }}
		>
			{children}
		</motion.div>
	);
};

export default function Home() {
	const router = useRouter();
	const [isExiting, setIsExiting] = useState(false);

	// const handleLinkClick = (href: string) => {
	// 	setIsExiting(true);
	// 	setTimeout(() => {
	// 		router.push(href);
	// 	}, 500);
	// };

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isExiting ? 0 : 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className={`${containerCss} ${Kiwi400.className}`}>
				<h1 className={`${pageTitleCss} ${Inknut400.className}`}>About</h1>

				<div className={profileCss}>
					<div
						className={css({
							width: {
								sm: "180px",
								base: "25dvw",
							},
							height: {
								sm: "180px",
								base: "25dvw",
							},
						})}
					>
						<Image
							src="/dere.webp"
							alt="iorin"
							width={180}
							height={180}
							sizes="100vw"
							style={{
								width: "100%",
								height: "auto",
							}}
						/>
					</div>
					<div>
						<p>こんにちは！いおりです</p>
						<p>書道やWebやカメラが好きです</p>
					</div>
				</div>
				<div className={`${aboutPageStyles} ${markdownStyles}`}>
					<InViewPortAppearance>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>{hobbyMd}</ReactMarkdown>
					</InViewPortAppearance>
					<InViewPortAppearance>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{careerMd}
						</ReactMarkdown>
					</InViewPortAppearance>
					<InViewPortAppearance>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{qualificationMd}
						</ReactMarkdown>
					</InViewPortAppearance>
				</div>
			</div>
		</motion.div>
	);
}
