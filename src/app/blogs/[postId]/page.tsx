export const runtime = "edge";

import { notFound } from "next/navigation";
import Image from "next/image";
import { getDetail } from "@/libs/microcms";
import { css } from "../../../../styled-system/css";
import { formatDate } from "@/libs/formatDate";
import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

const articleStyle = css({
	color: "#4C4C4C",
	letterSpacing: "0.1em",
	lineHeight: "2em",
	fontSize: {
		base: "14px",
		md: "16px",
	},
	"& p": {
		marginLeft: "10px",
		"& code": {
			borderRadius: "5px",
		},
	},
	"& h1": {
		fontSize: "22px",
		fontWeight: "bold",
		marginTop: "20px",
		marginBottom: "10px",
		borderBottom: "1px solid #ddd",
	},
	"& h2": {
		fontSize: "20px",
		fontWeight: "bold",
		marginTop: "20px",
		marginBottom: "10px",
		borderBottom: "1px solid #ddd",
	},
	"& h3": {
		fontSize: "18px",
		fontWeight: "bold",
		marginTop: "20px",
		marginBottom: "10px",
		borderBottom: "1px solid #ddd",
	},
	"& h4": {
		fontSize: "17px",
		fontWeight: "bold",
		marginTop: "20px",
		marginBottom: "10px",
		borderBottom: "1px solid #ddd",
	},
	"& h5": {
		fontSize: "16px",
		fontWeight: "bold",
		marginTop: "20px",
		marginBottom: "10px",
		borderBottom: "1px solid #ddd",
	},
	"& blockquote": {
		borderLeft: "5px solid #ddd",
		paddingLeft: "10px",
		margin: "10px",
	},
	"& pre": {
		"& code": {
			margin: "10px",
			padding: "25px !important",
			fontSize: {
				base: "12px",
				md: "14px",
			},
			letterSpacing: "0",
			lineHeight: "normal",
			borderRadius: "10px",
		},
	},
	"& table": {
		borderCollapse: "collapse",
		margin: "10px",
	},
	"& th": {
		border: "1px solid #ddd",
		padding: "10px",
		"& p": {
			marginLeft: "0",
		},
		backgroundColor: "#f2f2f2",
	},
	"& td": {
		border: "1px solid #ddd",
		padding: "10px",
		"& p": {
			marginLeft: "0",
		},
	},
	"& ul": {
		marginLeft: "20px",
		marginTop: "10px",
		marginBottom: "10px",
		listStyleType: "circle",
	},
	"& ol": {
		marginLeft: "20px",
		marginTop: "10px",
		marginBottom: "10px",
		listStyleType: "decimal",
	},
});

export default async function StaticDetailPage({
	params: { postId },
}: {
	params: { postId: string };
}) {
	const post = await getDetail(postId);
	console.log(post);
	const formattedDate = formatDate(post.publishedAt ?? "1900-01-01");

	const $ = load(post.content);
	$("code").each((_, elm) => {
		const className = $(elm).attr("class");
		const language = className?.replace("language-", "");

		let result;
		if (language) {
			try {
				result = hljs.highlight($(elm).text(), { language });
			} catch (error) {
				result = hljs.highlightAuto($(elm).text());
			}
		} else {
			result = hljs.highlightAuto($(elm).text());
		}
		$(elm).html(result.value);
		$(elm).addClass("hljs");
	});
	post.content = $.html();

	if (!post) {
		notFound();
	}

	return (
		<div>
			<div>
				<h1>News</h1>
				<div>
					<h1>{post.title}</h1>
					<div>
						<h2>{formattedDate}</h2>
					</div>
					<div
						className={articleStyle}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</div>
			</div>
		</div>
	);
}
