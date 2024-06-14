import { createClient } from "microcms-js-sdk";
import type {
	MicroCMSQueries,
	MicroCMSImage,
	MicroCMSDate,
} from "microcms-js-sdk";

export type News = {
	id: string;
	title: string;
	content: string;
	eyecatch?: MicroCMSImage;
} & MicroCMSDate;

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
	throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
	throw new Error("MICROCMS_API_KEY is required");
}

// API取得用のクライアントを作成
export const client = createClient({
	serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
	apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
	const listData = await client.getList<News>({
		endpoint: "news",
		queries,
	});

	// データの取得が目視しやすいよう明示的に遅延効果を追加
	await new Promise((resolve) => setTimeout(resolve, 3000));

	return listData;
};

// ブログの詳細を取得
export const getDetail = async (
	contentId: string,
	queries?: MicroCMSQueries,
) => {
	const detailData = await client.getListDetail<News>({
		endpoint: "news",
		contentId,
		queries,
	});

	// データの取得が目視しやすいよう明示的に遅延効果を追加
	await new Promise((resolve) => setTimeout(resolve, 3000));

	return detailData;
};
