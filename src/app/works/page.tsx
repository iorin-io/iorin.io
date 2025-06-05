// WorksPage.tsx
"use client";

import type React from "react";
import { type ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Inknut_Antiqua } from "next/font/google";
import { Kiwi_Maru } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { css, cx } from "../../../styled-system/css";
import { works, type Work } from "./workData";
import { ArrowDownZA, ArrowUpZA } from "lucide-react";
import { CategoryIcon } from "../../components/CategoryIcon";
import { categoryStyles } from "../../app/works/categoryStyles";

const Inknut400 = Inknut_Antiqua({ weight: "400", subsets: ["latin"] });
const Kiwi400 = Kiwi_Maru({ weight: "400", subsets: ["latin"] });

const pageContainer = css({ mx: "auto", maxW: "4xl", p: 8 });
const gridStyle = css({
	display: "grid",
	gridTemplateColumns: { base: "1fr", sm: "repeat(2, 1fr)" },
	gap: 6,
	mb: 8,
});
const cardBase = css({
	borderWidth: "1px",
	borderColor: "gray.200",
	rounded: "xl",
	overflow: "hidden",
	cursor: "pointer",
	transitionProperty: "all",
	transitionDuration: "300ms",
	_hover: {
		translateY: "-1", // small lift effect
		boxShadow: "xl",
		borderColor: "green.300",
	},
});
const imageWrapper = css({
	w: "full",
	h: 48,
	position: "relative",
	overflow: "hidden",
});
const cardContent = css({ p: 5 });
const yearText = css({ fontSize: "sm", color: "gray.500" });
const titleText = css({
	fontSize: "xl",
	fontWeight: "bold",
	mb: 2,
	color: "gray.800",
});
const summaryText = css({
	fontSize: "sm",
	color: "gray.600",
	lineHeight: "relaxed",
	mb: 3,
});
const badgeBase = css({ fontSize: "xs", px: 2, py: 1, rounded: "full" });

interface InViewPortAppearanceProp {
	children: ReactNode;
}
const InViewPortAppearance: React.FC<InViewPortAppearanceProp> = ({
	children,
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, ease: "easeOut" }}
		viewport={{ once: true, amount: 0.2 }}
	>
		{children}
	</motion.div>
);

export default function WorksPage() {
	const router = useRouter();
	const [sortAsc, setSortAsc] = useState(false);
	const [filter, setFilter] = useState<Work["category"] | "all">("all");
	const [isExiting, setIsExiting] = useState(false);

	const handleWorkClick = (workSlug: string) => {
		setIsExiting(true);
		router.push(`/works/${workSlug}?from=works`);
	};

	/* --- ソート & フィルタ済み配列 ---------------- */
	const visibleWorks = useMemo(() => {
		const base = works.filter((w) =>
			filter === "all" ? true : w.category === filter,
		);
		base.sort((a, b) => (sortAsc ? a.year - b.year : b.year - a.year));
		return base;
	}, [sortAsc, filter]);

	/* --- 全カテゴリ一覧を動的取得（並び替え可） -- */
	const categories: ("all" | Work["category"])[] = useMemo(() => {
		const set = new Set<Work["category"]>();
		works.forEach((w) => set.add(w.category));
		return ["all", ...Array.from(set)]; // "all" を先頭に
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isExiting ? 0 : 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className={cx(pageContainer, Kiwi400.className)}>
				<h1
					className={cx(
						css({
							fontSize: {
								sm: "48px",
								base: "32px",
							},
							marginTop: "24px",
							marginBottom: "32px",
						}),
						Inknut400.className,
					)}
				>
					Works
				</h1>
				<div
					className={css({
						display: "flex",
						flexDirection: "column",
						alignItems: "end",
						justifyContent: "flex-end",
						gap: 4,
						flexWrap: "wrap",
					})}
				>
					<button
						onClick={() => setSortAsc((prev) => !prev)}
						className={css({
							display: "flex",
							alignItems: "center",
							gap: 1,
							px: 3,
							py: 2,
							fontSize: "sm",
							bg: "gray.100",
							rounded: "lg",
							transition: "background-color 0.2s",
							_hover: { bg: "gray.200" },
						})}
					>
						{sortAsc ? <ArrowUpZA size={16} /> : <ArrowDownZA size={16} />}
						{sortAsc ? "古い順" : "新しい順"}
					</button>
					<div
						className={css({
							display: "flex",
							flexDirection: "row",
							alignItems: "end",
							justifyContent: "flex-end",
							gap: {
								sm: 4,
								base: 1.5,
							},
							mb: 6,
							flexWrap: "wrap",
						})}
					>
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setFilter(cat)}
								className={cx(
									badgeBase,
									cat === "all"
										? css({ bg: "gray.200", color: "gray.800" })
										: categoryStyles[cat as Work["category"]],
									cat === filter
										? css({ boxShadow: "outline", fontWeight: "bold" })
										: css({ opacity: 0.7, _hover: { opacity: 1 } }),
								)}
							>
								{cat === "all" ? "すべて" : cat}
							</button>
						))}
					</div>
				</div>

				<div className={gridStyle}>
					{visibleWorks.map((work) => (
						<InViewPortAppearance key={work.slug}>
							<motion.div
								className={cardBase}
								onClick={() => handleWorkClick(work.slug)}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								style={{ viewTransitionName: `work-${work.slug}` }}
							>
								<div className={imageWrapper}>
									{work.cover ? (
										<Image
											src={`/works/${work.cover}`}
											alt={work.title}
											fill
											style={{
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
													color:
														`${categoryStyles[work.category]} color`.replace(
															".800",
															".700",
														),
												})}
											/>
										</div>
									)}
								</div>
								<div className={cardContent}>
									<div
										className={css({
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											mb: 2,
										})}
									>
										<span
											className={cx(badgeBase, categoryStyles[work.category])}
										>
											{work.category}
										</span>
										<span className={yearText}>{work.year}</span>
									</div>
									<div className={titleText}>{work.title}</div>
									<div className={summaryText}>{work.summary}</div>
								</div>
							</motion.div>
						</InViewPortAppearance>
					))}
				</div>
			</div>
		</motion.div>
	);
}
