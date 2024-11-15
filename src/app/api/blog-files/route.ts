import fs from "fs";
import path from "path";

export async function GET() {
	const contentDir = path.join(process.cwd(), "public/blog");
	try {
		// contentフォルダの一覧を取得
		const files = fs
			.readdirSync(contentDir)
			.filter((file) => file.endsWith(".md"));
		return new Response(JSON.stringify({ files }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error reading content directory:", error);
		return new Response(
			JSON.stringify({ error: "Unable to fetch content files" }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
}
