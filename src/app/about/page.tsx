import Image from "next/image";
import styles from "./page.module.css";
import { New_Tegomin } from "next/font/google";
import { css } from "../../../styled-system/css";

const maincss = css({
	fontSize: "1.4rem",
	lineHeight: "2",
	margin: "0 10dvw",
});
const h1css = css({
	fontSize: "3rem",
});

const h2css = css({
	fontSize: "2rem",
});

const ulcss = css({
	padding: "0 0 0 20px",
});

const ulcircle = css({
	padding: "0 0 0 40px",
	listStyleType: "circle",
});

const uldisc = css({
	padding: "0 0 0 40px",
	listStyleType: "disc",
	lineHeight: "1.5",
});

const NewTegominFont = New_Tegomin({
	weight: "400",
	subsets: ["latin"],
});

export default function Home() {
	return (
		<main className={`${NewTegominFont.className} ${maincss}`}>
			<h1 className={`${h1css}`}>About</h1>
			<div>
				<h2 className={h2css}>趣味</h2>
				<ul className={`${ulcss} ${ulcircle}`}>
					<li>書道</li>
					<li>カメラ</li>
					<ul className={`${ulcss}`}>
						<li>ボディ</li>
						<ul className={`${ulcss} ${uldisc}`}>
							<li>Canon EOS Kiss X5</li>
							<li>FUJIFILM X-S20</li>
						</ul>
						<li>レンズ</li>
						<ul className={`${ulcss} ${uldisc}`}>
							<li>Canon EF50mm F1.8 STM</li>
							<li>TAMRON 17-70mm F/2.8 Di III-A VC RXD Xマウント</li>
						</ul>
					</ul>
					<li>インク・ガラスペン</li>
					<li>車</li>
					<ul className={`${ulcss}`}>
						<li>Copen LA-L880K</li>
					</ul>
				</ul>
			</div>
			<div>
				<h2 className={h2css}>経歴</h2>
				<ul className={ulcss}>
					<li>茨城県立並木中等教育学校9回生（2016/04~2022/03）</li>
					<li>第62回日本学生科学賞 文部科学大臣賞受賞</li>
					<li>筑波大学情報学群情報メディア創成学類（2022/04~）</li>
					<li>
						筑波大学学園祭実行委員会情報メディアシステム局（2022/05~2023/12）
					</li>
					<li>　同　局長（2023/01~2023/12）</li>
					<li>Open Hack U 2024 TOKYO　優秀賞（2024/02）</li>
					<li>株式会社 Kaizen Platform インターン（2024/06~）</li>
					<li>2024年度IPA未踏IT人材発掘・育成事業 採択（2024/06~）</li>
				</ul>
			</div>
			<div>
				<h2 className={h2css}>資格等</h2>
				<ul className={`${ulcss} ${ulcircle}`}>
					<li>普通自動車第一種運転免許</li>
					<li>応用情報技術者試験 合格</li>
					<li>データベーススペシャリスト試験 合格</li>
				</ul>
			</div>
		</main>
	);
}
