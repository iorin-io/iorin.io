import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
	const contentDir = path.join(process.cwd(), "public/blog");

	try {
		const files = fs
			.readdirSync(contentDir)
			.filter((file) => file.endsWith(".md"));

		const articles = files.map((file) => {
			const filePath = path.join(contentDir, file);
			const fileContent = fs.readFileSync(filePath, "utf-8");

			const { data } = matter(fileContent);

			return {
				slug: file.replace(".md", ""),
				title: data.title || "no title",
				date: data.date || "no date",
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
