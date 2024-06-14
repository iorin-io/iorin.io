export const runtime = "edge";

import Link from "next/link";
import { getList } from "@/libs/microcms";
import { css } from "../../../styled-system/css";
import sanitizeHtml from "sanitize-html";
import { formatDate } from "@/libs/formatDate";

export default async function StaticPage() {
	const { contents } = await getList();

	if (!contents || contents.length === 0) {
		return <h1>No contents</h1>;
	}

	return (
		<div>
			<div>
				<h1>News</h1>
				<div>
					{contents.map((post) => {
						const formattedDate = formatDate(post.publishedAt ?? "1900-01-01");
						const rawText = sanitizeHtml(post.content, {
							allowedTags: [],
							allowedAttributes: {},
						});
						const previewText =
							rawText.length > 150
								? `${rawText.substring(0, 150)}...`
								: rawText;

						return (
							<div key={post.id} className={css({ marginBottom: "20px" })}>
								<div
									className={css({
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									})}
								>
									<div>{post.title}</div>
									<div>{formattedDate}</div>
								</div>
								<div>
									<div>{previewText}</div>
								</div>
								<div>
									<Link href={`/news/${post.id}`}>Read More</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
