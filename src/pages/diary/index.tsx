import Header from "@/components/Header";
import Head from "next/head";
import styled from "styled-components";
import type { InferGetStaticPropsType, NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { getAllDiaries } from "../../lib/diary-api";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allDiaries = getAllDiaries(["slug", "title", "date", "tags"]);
  return {
    props: { allDiaries },
  };
};

const Bodydiv = styled.div`
  padding: 60px 40px;
  display: block;
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
  a {
    text-decoration: none;
  }
  h3 {
    text-align: center;
    font-size: 30px;
    color: #897e6d;
    font-family: Courier;
    margin: 0px;
  }
  h4 {
    text-align: left;
    font-size: 15px;
    color: #897e6d;
    margin-block-end: 0em;
    margin-block-start: 0em;
  }
  hr {
    border: 0;
    height: 1px;
    background: #897e6d;
    width: 80%;
  }
`;

const Diarydiv = styled.div`
  padding: 20px 20px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  width 70%;
  border: 1px solid #897e6d;
  border-radius: 10px;
`;

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
          <Header headertext="iorin.io" />
        </div>
        <Bodydiv>
          <h1>iorin.io</h1>
          <h2>睡眠時間が削られている</h2>
          <hr />
          <div>
            {allDiaries.map((post) => (
              <Diarydiv key={post.slug}>
                <a href={`/diary/${post.slug}`} key={post.slug}>
                  <h3>{post.title}</h3>
                  <h4>{post.date}</h4>
                </a>
              </Diarydiv>
            ))}
          </div>
        </Bodydiv>
      </main>
    </div>
  );
};

export default Index;
