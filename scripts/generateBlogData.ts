/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentDir = path.join(process.cwd(), "public/article");
const outputFile = path.join(process.cwd(), "public/article/blogData.json");

const generateBlogData = () => {
	const files = fs
		.readdirSync(contentDir)
		.filter((file: string) => file.endsWith(".md"));

	let articles = files.map((file: string) => {
		const filePath = path.join(contentDir, file);
		const fileContent = fs.readFileSync(filePath, "utf-8");
		const { data } = matter(fileContent);

		return {
			slug: file.replace(".md", ""),
			title: data.title || "no title",
			date: data.date || "no date",
		};
	});

	articles = articles.sort(
		(
			a: { date: string | number | Date },
			b: { date: string | number | Date },
		) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		},
	);

	fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
};

generateBlogData();
console.log("Blog data generated successfully!");
