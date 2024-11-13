import fs from "fs";
import path from "path";

export default function handler(res: {
	status: (arg0: number) => {
		(): any;
		new (): any;
		json: { (arg0: { files?: string[]; error?: string }): void; new (): any };
	};
}) {
	const contentDir = path.join(process.cwd(), "public/content");
	try {
		// contentフォルダの一覧を取得
		const files = fs
			.readdirSync(contentDir)
			.filter((file) => file.endsWith(".md"));
		res.status(200).json({ files });
	} catch (error) {
		console.error("Error reading content directory:", error);
		res.status(500).json({ error: "Unable to fetch content files" });
	}
}
