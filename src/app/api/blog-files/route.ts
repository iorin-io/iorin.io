import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
	const contentDir = path.join(process.cwd(), "public/blog");

	try {
		// Markdownファイルを取得し、各ファイルからメタデータを解析
		const files = fs
			.readdirSync(contentDir)
			.filter((file) => file.endsWith(".md"));

		const articles = files.map((file) => {
			// ファイルのパスと内容を取得
			const filePath = path.join(contentDir, file);
			const fileContent = fs.readFileSync(filePath, "utf-8");

			// gray-matterでフロントマターを解析
			const { data } = matter(fileContent);

			console.log("data", data);

			// スラッグを取得してメタデータとともにオブジェクトとして返す
			return {
				slug: file.replace(".md", ""), // ファイル名をスラッグに変換
				title: data.title || "無題",
				date: data.date || "日付不明",
			};
		});

		return new Response(JSON.stringify({ articles }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error reading content directory:", error);
		return new Response(
			JSON.stringify({ error: "Unable to fetch content files" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
