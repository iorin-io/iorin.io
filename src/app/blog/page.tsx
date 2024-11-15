"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { css } from "../../../styled-system/css";
import { Kiwi_Maru, Inknut_Antiqua } from "next/font/google";
import { motion } from "framer-motion";
import { OnClickSpan } from "../../components/OnClickSpan";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const containerCss = css({
	fontSize: {
		sm: "22.4px",
		base: "14px",
	},
	lineHeight: "25.6px",
	margin: "0 auto",
	maxWidth: "800px",
	padding: "32px",
});

const h1css = css({
	fontSize: {
		sm: "48px",
		base: "28px",
	},
	marginTop: "32px",
	marginBottom: "64px",
});

const ulCss = css({
	paddingLeft: "20px",
	marginBottom: "16px",
	listStyleType: "none",
});

const liCss = css({
	marginBottom: "8px",
});

const linkCss = css({
	// textDecoration: "none",
});

const MarkdownRenderer = () => {
	const [fileList, setFileList] = useState<string[]>([]);

	const router = useRouter();
	const [isExiting, setIsExiting] = useState(false);

	const handleLinkClick = (href: string) => {
		setIsExiting(true);
		setTimeout(() => {
			router.push(href);
		}, 500);
	};

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
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isExiting ? 0 : 1 }}
			transition={{ duration: 0.5 }}
			className={`${Kiwi400.className} ${css({ color: "#2F6F5E" })}`}
		>
			<div className={containerCss}>
				<h1 className={`${h1css} ${Inknut400.className}`}>Blog</h1>
				<ul className={ulCss}>
					{fileList.map((file, index) => {
						const fileNameWithoutExt = file.replace(".md", "");
						return (
							<li key={index} className={liCss}>
								<OnClickSpan
									onClick={() =>
										handleLinkClick(`/blog/article?art=${fileNameWithoutExt}`)
									}
									className={linkCss}
								>
									{fileNameWithoutExt}
								</OnClickSpan>
							</li>
						);
					})}
				</ul>
			</div>
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
