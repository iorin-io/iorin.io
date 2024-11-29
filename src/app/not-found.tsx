"use client";
export const runtime = "edge";
import { css } from "../../styled-system/css";
import { Inknut_Antiqua } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const containerCss = css({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	height: "100dvh",
	width: "100dvw",
	backgroundColor: "#fffaf0",
	textAlign: "center",
});

const headingCss = css({
	fontSize: {
		base: "32px",
		sm: "48px",
	},
	color: "#2F6F5E",
	marginBottom: "16px",
	fontWeight: "bold",
});

const descriptionCss = css({
	fontSize: {
		base: "16px",
		sm: "20px",
	},
	color: "#555",
	marginBottom: "24px",
});

const buttonCss = css({
	padding: "12px 24px",
	fontSize: "16px",
	color: "#fff",
	backgroundColor: "#2F6F5E",
	border: "none",
	borderRadius: "8px",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#1E4C3E",
	},
});

export default function NotFound() {
	const router = useRouter();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className={`${containerCss} ${Inknut400.className}`}
		>
			<h1 className={headingCss}>404 - Not Found</h1>
			<p className={descriptionCss}>
				お探しのページは見つかりませんでした。
			</p>
			<button
				className={buttonCss}
				onClick={() => router.push("/")}
			>
				Topページに戻る
			</button>
		</motion.div>
	);
}
