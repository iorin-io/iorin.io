import { Suspense } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<MarkdownRenderer article={slug} />
		</Suspense>
	);
}
