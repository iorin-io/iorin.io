import Header from "@/components/Header";
import Head from "next/head";
import styled from "styled-components";
import type { InferGetStaticPropsType, NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { getAllDiaries } from "../../lib/diary-api";

const Hdiv = styled.div`
  display: flex;
  position: sticky;
  bottom: 0px;
  background-color: #ebe7df;
  width: 100%;
  height: 300px;
  padding-left: 45px;
`;
const Bodydiv = styled.div`
  padding-top: 40px;
  h1 {
    text-align: center;
    font-size: 30px;
    color: #897e6d;
    font-family: Courier;
    margin: 0px;
    padding-top: 20px;
  }
  h2 {
    text-align: center;
    font-size: 20px;
    color: #897e6d;
    font-family: Courier;
    margin: 0px;
  }
  hr {
    border: 0;
    height: 1px;
    background: #897e6d;
    background-image: linear-gradient(to right, #ccc, #897e6d, #ccc);
    width: 80%;
  }
`;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allDiaries = getAllDiaries(["slug", "title", "date", "tags"]);
  return {
    props: { allDiaries },
  };
};

const Index: NextPage<Props> = ({ allDiaries }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>iorin.io</title>
        <meta name="description" content="行間への憧れ" />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
          sizes="32x32"
        />
      </Head>

      <main>
        <div>
          <Header subdirectory="/diary" />
        </div>
        <Bodydiv>
          <h1>iorin.io/diary</h1>
          <h2>睡眠時間が削られている</h2>
          <hr />
          <div className={styles.grid}>
            {allDiaries.map((post) => (
              <a
                href={`/diary/${post.slug}`}
                className={styles.card}
                key={post.slug}
              >
                <h2>{post.title}</h2>
                <p>{post.date}</p>
              </a>
            ))}
          </div>
        </Bodydiv>
      </main>
    </div>
  );
};

export default Index;
