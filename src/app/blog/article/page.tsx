"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { css } from "../../../../styled-system/css";
import { Kiwi_Maru, Inknut_Antiqua } from "next/font/google";
import { motion } from "framer-motion";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

const MarkdownRenderer = () => {
	const [markdownContent, setMarkdownContent] = useState("");
	const searchParams = useSearchParams();
	const slug = searchParams.get("art");

	const router = useRouter();
	const [isExiting, setIsExiting] = useState(false);

	// const handleLinkClick = (href: string) => {
	// 	setIsExiting(true);
	// 	setTimeout(() => {
	// 		router.push(href);
	// 	}, 500);
	// };

	useEffect(() => {
		if (!slug) {
			router.push("/blog");
			return;
		}
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

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<MarkdownRenderer />
		</Suspense>
	);
}
