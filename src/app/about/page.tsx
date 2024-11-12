"use client";

import { ReactNode, useState } from "react";
import { css } from "../../../styled-system/css";
import { motion } from "framer-motion";
import { Inknut_Antiqua } from "next/font/google";
import { Kiwi_Maru } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

const mainCss = css({
	fontSize: "1.4rem",
	lineHeight: "1.6",
	margin: "0 auto",
	maxWidth: "800px",
	padding: "2rem",
});

const h1css = css({
	fontSize: "3rem",
	marginBottom: "2rem",
});

const h2css = css({
	fontSize: "2rem",
	marginTop: "2rem",
	marginBottom: "1rem",
	borderBottom: "2px solid #AFC9BF",
	paddingBottom: "0.5rem",
});

const sectionCss = css({
	marginBottom: "3rem",
});

const profileCss = css({
	display: "flex",
	alignItems: "center",
	gap: "2rem",
	marginBottom: "2rem",
});

const ulCss = css({
	padding: "0 0 0 20px",
	marginBottom: "1rem",
});

const ulCircle = css({
	padding: "0 0 0 40px",
	listStyleType: "circle",
});

const ulDisc = css({
	padding: "0 0 0 40px",
	listStyleType: "disc",
	lineHeight: "1.5",
});

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const Kiwi400 = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
});

interface InViewPortAppearanceProp {
	children: ReactNode;
}

const InViewPortAppearance: React.FC<InViewPortAppearanceProp> = ({
	children,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }} // 初期状態: 不透明度0、少し下の位置
			whileInView={{ opacity: 1, y: 0 }} // ビューポートに入ったら不透明度1、元の位置に移動
			transition={{ duration: 0.6, ease: "easeOut" }} // アニメーションの設定
			viewport={{ once: true, amount: 0.2 }} // 一度だけトリガーし、20%がビューポートに入ったら発火
		>
			{children}
		</motion.div>
	);
};

export default function Home() {
	const router = useRouter();
	const [isExiting, setIsExiting] = useState(false);

	const handleLinkClick = (href: string) => {
		setIsExiting(true);
		setTimeout(() => {
			router.push(href);
		}, 500);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isExiting ? 0 : 1 }}
			transition={{ duration: 0.5 }}
			className={css({ color: "#2F6F5E" })}
		>
			<div className={`${mainCss} ${Kiwi400.className}`}>
				<h1 className={`${h1css} ${Inknut400.className}`}>About</h1>

				<div className={profileCss}>
					<Image src="/dere.png" alt="iorin" width={180} height={180} />
					<div>
						<p>こんにちは！いおりです</p>
						<p>書道やWebやカメラが好きです</p>
					</div>
				</div>
				<InViewPortAppearance>
					<div className={sectionCss}>
						<h2 className={h2css}>趣味</h2>
						<ul className={`${ulCss} ${ulCircle}`}>
							<li>書道</li>
							<li>カメラ</li>
							<ul className={`${ulCss}`}>
								<li>ボディ</li>
								<ul className={`${ulCss} ${ulDisc}`}>
									<li>Canon EOS Kiss X5</li>
									<li>FUJIFILM X-S20</li>
								</ul>
								<li>レンズ</li>
								<ul className={`${ulCss} ${ulDisc}`}>
									<li>Canon EF50mm F1.8 STM</li>
									<li>TAMRON 17-70mm F/2.8 Di III-A VC RXD Xマウント</li>
								</ul>
							</ul>
							<li>インク・ガラスペン</li>
							<li>車</li>
							<ul className={`${ulCss}`}>
								<li>Copen LA-L880K</li>
							</ul>
						</ul>
					</div>
				</InViewPortAppearance>
				<InViewPortAppearance>
					<div className={sectionCss}>
						<h2 className={h2css}>経歴</h2>
						<ul className={ulCss}>
							<li>茨城県立並木中等教育学校 9回生（2016/04~2022/03）</li>
							<li>第62回日本学生科学賞 文部科学大臣賞受賞</li>
							<li>筑波大学 情報学群 情報メディア創成学類（2022/04~）</li>
							<li>
								筑波大学学園祭実行委員会情報メディアシステム局（2022/05~2023/12）
							</li>
							<li>　同　局長（2023/01~2023/12）</li>
							<li>Open Hack U 2024 TOKYO　優秀賞（2024/02）</li>
							<li>株式会社 Kaizen Platform インターン（2024/06~）</li>
							<li>2024年度IPA未踏IT人材発掘・育成事業 採択（2024/06~）</li>
						</ul>
					</div>
				</InViewPortAppearance>
				<InViewPortAppearance>
					<div className={sectionCss}>
						<h2 className={h2css}>資格等</h2>
						<ul className={`${ulCss} ${ulCircle}`}>
							<li>普通自動車第一種運転免許</li>
							<li>応用情報技術者</li>
							<li>データベーススペシャリスト</li>
						</ul>
					</div>
				</InViewPortAppearance>
			</div>
		</motion.div>
	);
}
