"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { css } from "../../../styled-system/css";
import { Kiwi_Maru } from "next/font/google";
import { motion } from "framer-motion";
import { OnClickSpan } from "../../components/OnClickSpan";
import BlogTitle from "../../components/BlogTitle";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

const containerCss = css({
	margin: "0 auto",
	maxWidth: "800px",
	padding: "32px",
});

const ulCss = css({
	marginBottom: "16px",
	listStyleType: "none",
});

const liCss = css({
	marginBottom: "20px",
});

const flexContainerDivCss = css({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	borderBottom: "1px solid #e0e0e0",
	width: "100%",
});

const titleCss = css({
	fontSize: "18px",
	fontWeight: "bold",
	marginBottom: "4px",
	display: "block",
});

const dateCss = css({
	fontSize: "14px",
	color: "#888",
	display: "block",
	marginBottom: "12px",
});

const BlogsPage = () => {
	const [articles, setArticles] = useState<
		{ slug: string; title: string; date: string }[]
	>([]);
	const router = useRouter();
	const [isExiting, setIsExiting] = useState(false);

	const handleLinkClick = (href: string) => {
		setIsExiting(true);
		setTimeout(() => {
			router.push(href);
		}, 500);
	};
	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch("/article/blogData.json");
				if (!response.ok) {
					throw new Error("Failed to fetch content files");
				}
				const data = await response.json();
				setArticles(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchArticles();
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isExiting ? 0 : 1 }}
			transition={{ duration: 0.5 }}
			className={`${Kiwi400.className}`}
		>
			<div className={containerCss}>
				<BlogTitle />
				<ul className={ulCss}>
					{articles.map((article, index) => (
						<li key={index} className={liCss}>
							<OnClickSpan
								onClick={() => handleLinkClick(`/blog/${article.slug}`)}
							>
								<div className={flexContainerDivCss}>
									<span className={titleCss}>{article.title}</span>
									<span className={dateCss}>
										{new Date(article.date).toLocaleDateString("ja-JP", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</div>
							</OnClickSpan>
						</li>
					))}
				</ul>
			</div>
		</motion.div>
	);
};

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BlogsPage />
		</Suspense>
	);
}
