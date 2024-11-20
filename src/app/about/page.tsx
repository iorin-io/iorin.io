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
import { containerCss, markdownStyles, pageTitleCss } from "@/const/css";

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
							src="/dere.png"
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
