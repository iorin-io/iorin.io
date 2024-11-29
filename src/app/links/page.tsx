"use client";

import { Kiwi_Maru, Inknut_Antiqua } from "next/font/google";
import { css } from "../../../styled-system/css";
import { SiGithub, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { OnClickSpan } from "@/components/OnClickSpan";
import { type ReactNode, useState } from "react";
import { motion } from "framer-motion";

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

const Inknut400 = Inknut_Antiqua({
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

interface SectionProps {
	title: string;
	children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
	return (
		<div className={css({ marginBottom: "32px" })}>
			<h2
				className={css({
					borderBottom: "2px solid #AFC9BF",
					fontSize: "24px",
					marginBottom: "12px",
					fontWeight: "bold",
				})}
			>
				{title}
			</h2>
			{children}
		</div>
	);
};

export default function Links() {
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
			className={`${containerCss} ${Kiwi400.className} `}
		>
			<h1 className={`${pageTitleCss} ${Inknut400.className}`}>Links</h1>
			<Section title="SNS">
				<div
					className={css({
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: "row",
						maxWidth: "300px",
						margin: "0 auto",
						padding: "16px",
					})}
				>
					<OnClickSpan
						onClick={() => window.open("https://x.com/iorin__io")}
						whileHover={{ scale: 1.1 }}
					>
						<SiX size={60} />
					</OnClickSpan>
					<OnClickSpan
						onClick={() => window.open("https://instagram.com/iorin_io")}
						whileHover={{ scale: 1.1 }}
					>
						<SiInstagram size={60} />
					</OnClickSpan>
					<OnClickSpan
						onClick={() => window.open("https://github.com/iorin-io")}
						whileHover={{ scale: 1.1 }}
					>
						<SiGithub size={60} />
					</OnClickSpan>
				</div>
			</Section>
			<Section title="Others">
				<div className={css({ marginBottom: "16px" })}>
					<ul
						className={css({
							paddingLeft: "24px",
							listStyleType: "disc",
							lineHeight: "2",
						})}
					>
						<li>
							<a href="https://raspi0124.dev/" rel="nofollow">
								raspi0124
							</a>
						</li>
						<li>
							<a href="https://it4pstudio.com/" rel="nofollow">
								iT4P
							</a>
						</li>
						<li>
							<a href="https://www.ultrabumbuku.dev/" rel="nofollow">
								ウルトラぶんぶく
							</a>
						</li>
						<li>
							<a href="https://www.eka.earth/" rel="nofollow">
								Ekasilicon
							</a>
						</li>
					</ul>
				</div>
				<div>
					<a href="https://sites.google.com/view/happy-busy/" rel="nofollow">
						<img src="/noTime.png" alt="時間ねぇ〜" />
					</a>
				</div>
				<div>
					<a href="https://love.tsukuba-ac.net/" rel="nofollow">
						<img
							src="/tsukuba-love2.png"
							alt="つくばに住んでいます。つくばの方が、楽しいので。"
						/>
					</a>
				</div>
			</Section>
		</motion.div>
	);
}
