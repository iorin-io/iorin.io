import { body, label, li, p, summary, title } from "framer-motion/client";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * 「Works」ページ用データモデル
 * 追記・修正はこのファイルだけで完結させると保守が楽になります。
 */
export interface Work {
	slug: string; // URL に使う一意 ID
	title: string; // 表示タイトル
	year: number; // 主たる年度
	category: "採択" | "受賞" | "開発" | "学内活動" | "資格";
	summary: string; // 一覧に載せる 1 行説明
	cover?: string; // サムネ画像 (public/images 内)
	body: ReactNode; // Markdown 本文 (詳細ページ用)
	links: { label: string; url: string }[]; // 参考 URL
}

export const works: Work[] = [
	{
		slug: "ipa-mitou-it-2024-super-creator",
		title: "2024年度未踏IT  スーパークリエータ認定",
		year: 2025,
		category: "受賞",
		summary: "2024年度未踏IT人材発掘・育成事業においてスーパークリエータに認定",
		cover: "ipa-mitou-it-2024-super-creator.webp",
		body: (
			<>
				<p>
					独立行政法人情報処理推進機構（IPA）が主催する2024年度未踏IT人材発掘・育成事業において、スーパークリエータに認定されました。
				</p>
			</>
		),
		links: [
			{
				label: "IPA公表ページ",
				url: "https://www.ipa.go.jp/jinzai/mitou/it/2024/supercreator.html",
			},
			{
				label: "経済産業省ニュースリリース",
				url: "https://www.meti.go.jp/press/2025/05/20250529001/20250529001.html",
			},
			{
				label: "スーパークリエータ一覧",
				url: "https://www.ipa.go.jp/jinzai/mitou/koubo/career/super-creator.html",
			},
			{
				label: "スーパークリエータ紹介ページ（髙𣘺伊織）",
				url: "https://www.ipa.go.jp/jinzai/mitou/koubo/career/2024/2024-supercreator-16.html",
			},
		],
	},
	{
		slug: "ipa-mitou-it-2024",
		title:
			"2024年度 未踏IT 採択・クリエータ認定「トラックボール型3Dマウスの開発」",
		year: 2024,
		category: "採択",
		summary: "2024年度未踏IT人材発掘・育成事業に採択されました",
		// cover: "ipa-mitou-2024.webp",
		body: (
			<>
				<p>
					独立行政法人情報処理推進機構（IPA）が主催する2024年度未踏IT人材発掘・育成事業に、私たちの「トラックボール型3Dマウスの開発」が採択されました。
				</p>
				<p>
					プロジェクトでは、3軸回転を用いてモデリングソフトを操作するためのトラックボール型3DマウスParRot・設定用Webアプリ・各種アドインなどの開発を行いました。
				</p>
				<p>
					本成果をもとに、同プロジェクトはIPA未踏ITにおいて
					<Link href="/works/ipa-mitou-it-2024-super-creator?from=works">
						スーパークリエータに認定されました
					</Link>
					。
				</p>
			</>
		),
		links: [
			{
				label: "未踏IT人材発掘・育成事業HP",
				url: "https://www.ipa.go.jp/jinzai/mitou/koubo/programs/it.html",
			},
			{
				label: "ParRot GitHub",
				url: "https://github.com/ParRot-3DMouse",
			},
			{
				label: "採択プロジェクト概要",
				url: "https://www.ipa.go.jp/jinzai/mitou/it/2024/gaiyou-tk-3.html",
			},
			{
				label: "成果詳細",
				url: "https://www.ipa.go.jp/jinzai/mitou/it/2024/nl10bi0000006qh1-att/seikashosai-tk-3.pdf",
			},
			{
				label: "採択案件評価書",
				url: "https://www.ipa.go.jp/jinzai/mitou/it/2024/nl10bi0000006qh1-att/hyouka-tk-3.pdf",
			},
		],
	},
	{
		slug: "parrot-interaction-2025",
		title: "ParRot: トラックボール型3Dマウスの提案と評価 (Interaction 2025)",
		year: 2025,
		category: "採択",
		summary: "Interaction 2025 インタラクティブ発表（デモ）",
		// cover: "interaction-2025-parrot.webp",
		links: [
			{
				label: "論文PDF（査読なし）",
				url: "https://www.interaction-ipsj.org/proceedings/2025/data/pdf/2B-48.pdf",
			},
		],
		body: (
			<p>
				トラックボール型3DマウスParRotの提案と操作性能の評価を行いました。ユーザスタディでは既存3Dマウスとの比較で操作負荷の低減を示しました。
			</p>
		),
	},
	{
		slug: "open-hack-u-2024-anpi",
		title: "Open Hack U 2024 TOKYO 優秀賞「anpi」",
		year: 2024,
		category: "受賞",
		summary: "Yahoo! JAPAN 主催 Hack U で優秀賞を受賞",
		// cover: "open-hack-u-2024.webp",
		links: [
			{
				label: "イベント公式サイト",
				url: "https://hacku.yahoo.co.jp/hacku2024_tokyo/",
			},
		],
		body: (
			<p>
				災害時の安否確認を簡便にするサービスanpiを開発し、Open Hack U 2024 TOKYO
				で優秀賞を受賞しました。
			</p>
		),
	},
	{
		slug: "ibaraki-dreampass-2021",
		title: "IBARAKIドリーム・パス事業〈第2回〉銀賞「片手デバイスの開発」",
		year: 2021,
		category: "受賞",
		summary: "第2回 IBARAKIドリーム・パス事業で銀賞を受賞しました",
		// cover: "ibaraki-dreampass-2021.webp",
		links: [
			{ label: "リバネス記事", url: "https://lne.st/2021/03/24/ibarakidream/" },
			{
				label: "水戸経済新聞 記事",
				url: "https://mito.keizai.biz/headline/1806/",
			},
		],
		body: (
			<p>
				把持しながら使用できるマウス代替デバイスを開発し、第2回IBARAKIドリーム・パス事業で銀賞を獲得しました。
			</p>
		),
	},
	{
		slug: "jssa-2018-mext-award",
		title: "第62回 日本学生科学賞 文部科学大臣賞",
		year: 2018,
		category: "受賞",
		summary:
			"モーションキャプチャシステム開発で文部科学大臣賞 (中学校団体部門)",
		cover: "jssa-62nd-2018.webp",
		links: [
			{
				label: "受賞一覧 (読売新聞)",
				url: "https://event.yomiuri.co.jp/jssa/prize/62_j",
			},
		],
		body: (
			<p>
				六軸加速度センサとUnityを用いたモーションキャプチャシステムを開発し、第62回日本学生科学賞にて文部科学大臣賞を受賞しました。
			</p>
		),
	},
	{
		slug: "parrot3dmouse",
		title: "オープンソース トラックボール型3Dマウス「ParRot」",
		year: 2024,
		category: "開発",
		summary: "2024年度未踏ITで開発したオープンソーストラックボール型3Dマウス",
		cover: "parrot3dmouse.webp",
		links: [
			{ label: "GitHub (Org)", url: "https://github.com/ParRot-3DMouse" },
			{
				label: "Hardware",
				url: "https://github.com/ParRot-3DMouse/ParRotHardware",
			},
			{
				label: "Firmware",
				url: "https://github.com/ParRot-3DMouse/ParRotFirmware",
			},
			{ label: "ParRot Nest", url: "https://nest.parrot3dmouse.com/" },
		],
		body: (
			<p>
				トラックボール型 3D マウス ParRot を開発し、作り方やファームウェア等を
				OSS として公開しています。X (旧 Twitter) では
				18万インプレッション、1,300以上のいいねを獲得するなど話題となりました。
			</p>
		),
	},

	{
		slug: "tsukuba-fes-committee-jsys",
		title: "筑波大学学園祭実行委員会 情報メディアシステム局 局長",
		year: 2023,
		category: "学内活動",
		summary: "jsys23局長を務めました",
		// cover: "gakusai-committee.webp",
		links: [
			{
				label: "第49回学園祭公式サイトアーカイブ",
				url: "https://49th.sohosai.com/",
			},
		],
		body: (
			<>
				<p>
					筑波大学学園祭実行委員会
					情報メディアシステム局の2023年度局長を務めました。
				</p>
				<p>業務としては、主に以下のことを行いました。</p>
				<ul>
					<li>組織運営</li>
					<li>学園祭公式サイトの制作</li>
					<li>UNITEDステージ 生配信システムの構築</li>
					<li>著作権処理</li>
					<li>インフラ管理</li>
				</ul>
				<p>至らない部分もあり反省点は多いですが、良い経験でした。</p>
			</>
		),
	},
	{
		slug: "shinkan-sai-2024",
		title: "2024年度 新歓祭 運営",
		year: 2024,
		category: "学内活動",
		summary: "2024年度の新歓祭に学園祭実行委員として参加しました",
		// cover: "shinkan-2024.webp",
		links: [],
		body: (
			<p>
				2024年度の新歓祭に、学実委として参加しました。主に警備や来場者への案内等を行いました。
			</p>
		),
	},
	{
		slug: "cojt-sw-2024",
		title: "COJT SW コース修了",
		year: 2024,
		category: "学内活動",
		summary: "COJT SW コースを修了しました",
		cover: "cojt-2024.webp",
		links: [
			{
				label: "参加した学生（髙𣘺伊織）",
				url: "https://tsukuba-cojt.github.io/students/2024SW101/",
			},
			{
				label: "COJT成果発表",
				url: "https://tsukuba-cojt.github.io/results/2024autumn/autotrack/",
			},
		],
		body: (
			<p>
				2024年度 COJT SW コースを終了しました。本授業では
				<Link href="/works/autotrack-2024">AutoTrack</Link>
				を開発しました。Next.jsを用いたフロントエンド・Honoを用いたバックエンド・Cloudflareを用いたインフラを担当しました。
			</p>
		),
	},
	{
		slug: "autotrack-2024",
		title: "愛車管理 Web アプリ「AutoTrack」",
		year: 2024,
		category: "開発",
		summary: "車検・給油・メンテ情報を一元管理できる Web アプリ",
		cover: "autotrack.webp",
		links: [
			{
				label: "AutoTrack",
				url: "https://autotrack.work",
			},
			{
				label: "COJT成果発表",
				url: "https://tsukuba-cojt.github.io/results/2024autumn/autotrack/",
			},
			{ label: "GitHub", url: "https://github.com/COJT24-AutoTrack" },
		],
		body: (
			<p>
				<Link href="/works/cojt-sw-2024?from=works">
					COJT SW コースで開発した
				</Link>
				愛車管理アプリ。自分の車の燃費はどれくらいなのか、最後にエンジンオイルを交換したのはいつなのか、過去に行ったチューニングはどんな内容だった等の情報を一元管理するためのWebアプリです。フロントエンド・バックエンド・インフラを担当しました。
			</p>
		),
	},
	{
		slug: "entrance-ceremony-pa-2025",
		title: "2025年度 入学式ステージ PA",
		year: 2025,
		category: "学内活動",
		summary: "入学式ステージの音響 (PA) を担当",
		cover: "entrance-ceremony-2025.webp",
		links: [],
		body: (
			<p>筑波大学入学式のステージパフォーマンスで PA (音響) を担当しました。</p>
		),
	},
	{
		slug: "ap-fe-2023",
		title: "応用情報技術者 (AP) 合格",
		year: 2023,
		category: "資格",
		summary: "IPA 国家試験 応用情報技術者試験に合格",
		links: [],
		body: (
			<p>
				独立行政法人情報処理推進機構が主催する情報処理技術者試験の1つ、応用情報技術者試験に合格しました
			</p>
		),
	},
	{
		slug: "db-sp-2023",
		title: "データベーススペシャリスト (DB) 合格",
		year: 2023,
		category: "資格",
		summary: "IPA 国家試験 データベーススペシャリスト試験に合格",
		links: [],
		body: (
			<p>
				独立行政法人情報処理推進機構が主催する情報処理技術者試験の1つ、データベーススペシャリスト試験に合格しました
			</p>
		),
	},
];
