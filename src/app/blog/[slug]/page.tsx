export const runtime = "edge";
import { Suspense } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { css } from "../../../../styled-system/css";
import { Kiwi_Maru } from "next/font/google";
const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});
export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<Suspense
			fallback={
				<div
					className={`${css({
						height: "100dvh",
						width: "100dvw",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "#2F6F5E",
					})} ${Kiwi400.className}`}
				>
					<p>Loading...</p>
				</div>
			}
		>
			<MarkdownRenderer article={slug} />
		</Suspense>
	);
}
