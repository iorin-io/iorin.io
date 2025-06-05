"use client";

export const runtime = "edge";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Kiwi_Maru } from "next/font/google";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { works, type Work } from "../workData";
import { css, cx } from "../../../../styled-system/css";
import WorksTitle from "../../../components/WorksTitle";
import { categoryStyles } from "../categoryStyles";
import { CategoryIcon } from "../../../components/CategoryIcon";

const Kiwi400D = Kiwi_Maru({ weight: "400", subsets: ["latin"] });

const container = css({ mx: "auto", maxW: "4xl", p: 8 });
const backBtn = css({
	display: "flex",
	alignItems: "center",
	gap: 2,
	mb: 6,
	px: 4,
	py: 2,
	bg: "transparent",
	rounded: "lg",
	cursor: "pointer",
	fontSize: "sm",
	color: "gray.700",
	transitionProperty: "all",
	transitionDuration: "300ms",
});
const heroImage = css({
	width: "100%",
	position: "relative",
	rounded: "xl",
	overflow: "hidden",
	mb: 8,
});
const titleStyle = css({
	fontSize: { base: "3xl", sm: "4xl" },
	fontWeight: "bold",
	marginBottom: 4,
});
const metaBox = css({
	display: "flex",
	flexWrap: "wrap",
	gap: 4,
	mb: 6,
	p: 4,
	bg: "gray.50",
	rounded: "lg",
});
const metaItem = css({ fontSize: "sm", color: "gray.600" });
const linksWrapper = css({ display: "flex", flexWrap: "wrap", gap: 2, mb: 8 });
const linkBtn = css({
	bg: "blue.100",
	color: "blue.800",
	fontSize: "sm",
	px: 3,
	py: 1.5,
	rounded: "lg",
	transitionProperty: "background-color",
	transitionDuration: "200ms",
	_hover: { bg: "blue.200" },
});
const bodyText = css({
	fontSize: "base",
	lineHeight: "relaxed",
	maxW: "none",
	color: "gray.700",
});

const paraStyle = css({
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

export default function WorkDetailPage() {
	const router = useRouter();
	const params = useParams();
	const [work, setWork] = useState<Work | null>(null);

	useEffect(() => {
		const workSlug = params.slug as string;
		const foundWork = works.find((w) => w.slug === workSlug);
		if (foundWork) setWork(foundWork);
	}, [params.slug]);

	const searchParams = useSearchParams();
	const cameFromWorks = searchParams.get("from") === "works"; // ★ここだけ

	const handleBackClick = () => {
		const action = () => {
			// 履歴が残っていて、かつ Works から来たとわかる場合だけ back
			if (cameFromWorks && window.history.length > 1) {
				router.back();
			} else {
				router.push("/works");
			}
		};

		// View Transition API があればそちらへ
		if ("startViewTransition" in document) {
			document.startViewTransition(action);
		} else {
			action();
		}
	};

	console.log("Work detail page loaded for:", work?.title);

	if (!work) {
		return (
			<div
				className={css({
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					minH: "screen",
				})}
			>
				<div className={css({ fontSize: "lg" })}>Loading...</div>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className={cx(container, Kiwi400D.className)}>
				<WorksTitle />
				<button onClick={handleBackClick} className={backBtn}>
					<ArrowLeft size={16} /> 戻る
				</button>

				<motion.div className={heroImage}>
					{work.cover ? (
						<Image
							src={`/works/${work.cover}`}
							alt={work.title}
							width={0}
							height={0}
							sizes="100%"
							style={{
								width: "100%",
								height: "auto",
								objectFit: "cover",
								viewTransitionName: `work-${work.slug}`,
								contain: "paint",
							}}
						/>
					) : (
						<div
							className={css({
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								h: "full",
								w: "full",
								bg: `${categoryStyles[work.category]} bg`.replace(
									".200",
									".100",
								),
							})}
						>
							<CategoryIcon
								category={work.category}
								size={56}
								className={css({
									color: `${categoryStyles[work.category]} color`.replace(
										".800",
										".700",
									),
								})}
							/>
						</div>
					)}
				</motion.div>
				<div className={cx(titleStyle, Kiwi400D.className)}>{work.title}</div>

				<div className={metaBox}>
					<div className={metaItem}>
						<strong>カテゴリー:</strong> {work.category}
					</div>
					<div className={metaItem}>
						<strong>年度:</strong> {work.year}
					</div>
				</div>

				<article className={bodyText}>
					<div className={paraStyle}>{work.body}</div>
				</article>

				{work.links.length > 0 && (
					<section className={css({ mb: 8, mt: 6 })}>
						<h3 className={css({ fontSize: "lg", fontWeight: "bold", mb: 3 })}>
							関連リンク
						</h3>
						<div className={linksWrapper}>
							{work.links.map((link, i) => (
								<a
									key={i}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className={linkBtn}
								>
									{link.label}
								</a>
							))}
						</div>
					</section>
				)}
			</div>
		</motion.div>
	);
}
