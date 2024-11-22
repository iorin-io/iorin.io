---
title: Next.jsとMarkdownでブログを実装した
date: 2024-11-22
---

[mastAdC2024](https://adventar.org/calendars/10425)にあたり、Next.jsとMarkdownでブログを実装しました。せっかくなので記録を残しておこうと思います。

# なぜmdなのか

当初、ブログ実装にあたりMicroCMSの利用を検討していました。実際にCMSとの連携まで試してみたものの、自身の個人ブログには少しオーバースペックに感じたこと・少なくはないにしろストレージの制限があることから、今回は採用しませんでした。

そこで友人に相談したところ、ある人が「Markdown良いよ」と言っていたので、今回はMarkdownを使用してブログを実装することにしました。

![先輩からマークダウンでのブログを勧められた様子](/blogImage/mdBlog.webp)

# 実装について

## 技術構成

ブログ実装に使用している技術は以下のようになっています。

- Next.js v15.0.3
- react-markdown v9.0.1
- remark-gfm v4.0.0
- gray-matter v4.0.3

また、Cloudflare Pagesを使用してデプロイ・ホスティングをしています。もうCloudflareなしでは生きていけない体に……。

## 最終的なディレクトリ構成

最終的なディレクトリ構成はこんな感じになりました。

```
├── src
    ├── app
    │   ├── blog
    │   │   ├── [slug]
    │   │   │   ├── MarkdownRenderer.tsx
    │   │   │   └── page.tsx
    │   │   └── page.tsx
```

ブログ記事を動的に読み込めるようにNext.jsのDynamic Routesを利用しています。各ブログ記事は[slug]というダイナミックセグメントを使用し、記事の内容をMarkdownファイルから動的に取得できるようにしました。

Markdownファイルはpublic/blogディレクトリ内に保存しています。この構成により、Markdownファイルを簡単に編集してpushするだけでブログ記事を追加・更新できるようになりました。

```
├── public
    ├── blog
    │   ├── blogData.json
    │   └── 記事.mdファイル
```

## Markdownで記事を書く

### React Markdown

Markdown→HTMLの変換は、`react-markdown`を使用しました。

```tsx
<ReactMarkdown>{children}</ReactMarkdown>
```

のように`children`にMarkdownの文字列を与えると、それをHTMLに変換してくれます。

### Remark GFM

GFM記法をサポートするために`remark-gfm`を使用しています。
GFMとはGitHub Flavored Markdownの略で、文字通りGitHubで使用できるMarkdownです。

こんな記法が使用できるようになります。

```md
- [ ] foo
- [x] bar
```

- [ ] foo
- [x] bar

```
www.commonmark.org←勝手にリンクになる
```

www.commonmark.org

### Gray Matter

記事のメタデータ（タイトル・日付）などは、Yaml Header形式で書いています。

```yml
---
title: Next.jsとMarkdownでブログを実装した
date: 2024-11-22
---
```

このメタデータをパースするために使用しているのが`gray-matter`です。
以下のように、Markdown文字列をmatter関数の引数に与えることで、メタデータと本文に分割してくれます。便利。

```tsx
const { content, data } = matter(text);
setMarkdownContent(content);
setMetadata(data);
```

## Md記事の取得

Next.jsで静的な記事を生成したいときは`getStaticProps()`を使用するのが一般的だと思います。`getStaticProps()`は、動的なコンテンツをビルド時に静的に生成するための関数です。Dynamic Routesを使用している場合によく用いられます。

一方で当ブログでも使用している、Next.js v13以降のApp Router方式では、`getStaticProps()`が廃止されました。

App RouterでのSSGは、以下のように書くことができます

```ts
const response = await fetch(`/blog/${article}.md`, {
	cache: "force-cache",
});
```

なんとこれだけです。
AppRouterでは、globalのfetchを改造していて、cacheオプションでSSR/ISRを決めることができるらしいです。今回はSSGしたかったので`cache: "force-cache",`を指定しました。
SSRしたい時は、`cache: "no-store"`を指定します。

この辺りは以下の記事が参考になりました。興味があればぜひ見てください。

[キャッシュで理解するNext.js App Routerのデータ取得](https://zenn.dev/tasugi/articles/d05c445bc79f09)

最終的にはこのような形で記事を取得しています。

```ts
const [markdownContent, setMarkdownContent] = useState("");
const [metadata, setMetadata] = useState<{ title?: string; date?: string }>({});

useEffect(() => {
	const fetchMarkdown = async () => {
		try {
			const response = await fetch(`/blog/${article}.md`, {
				// cache: "force-cache",
			});
			if (!response.ok) {
				throw new Error("Markdown file could not be fetched");
			}
			const text = await response.text();
			const { content, data } = matter(text);
			setMarkdownContent(content);
			setMetadata(data);
		} catch (error) {
			console.error(error);
		}
	};

	fetchMarkdown();
}, [article]);
```

## 記事一覧の取得

当初、blogディレクトリ内のファイルを走査して一覧を返すようなAPIを実装していました。しかし、Cloudflareでデプロイしたところ、`fs`や`path`が使用できないというエラーが発生しました。

これはCloudflareがNode.jsの実行環境ではないためです。

そこで、ビルド時に以下のようなスクリプトを動かすようにしました。

```ts
// generateBlogData.ts
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentDir = path.join(process.cwd(), "public/blog");
const outputFile = path.join(process.cwd(), "public/blog/blogData.json");

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
```

```json
// package.json
"scripts": {
	"generate:blog-data": "ts-node scripts/generateBlogData.ts",
	"dev": "npm run generate:blog-data && next dev",
	"build": "npm run generate:blog-data && next build",
},
```

これにより、ブログの一覧データが静的に生成されます。

```json
[
	{
		"slug": "create-blog",
		"title": "Next.jsとMarkdownでブログを実装した",
		"date": "2024-11-22T00:00:00.000Z"
	},
	{
		"slug": "site-launched",
		"title": "サイトを公開！",
		"date": "2024-11-15T00:00:00.000Z"
	}
]
```

ブログ記事一覧ページではこのjsonを参照することで、各ページへの導線を作成することができます。

以上で、ブログ記事一覧ページ・各ブログページが実装できました！
