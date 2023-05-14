import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getAllDiaries, getDiaryBySlug } from "../../lib/diary-api";
import markdownToHtml from "../../lib/markdownToHtml";
import { PanoramaSharp } from "@material-ui/icons";
import styled from "styled-components";
import Header from "@/components/Header";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * 記事のパスを取得する
 */

export const getStaticPaths = async () => {
  const posts = getAllDiaries(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

/**
 * 記事の内容を取得する
 */
export const getStaticProps = async ({ params }: any) => {
  const post = getDiaryBySlug(params.slug, [
    "slug",
    "title",
    "date",
    "content",
  ]);
  // Markdown を HTML に変換する
  const content = await markdownToHtml(post.content);
  // content を詰め直して返す
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

const Article = styled.article`
  padding: 60px 150px;

  h1 {
    text-align: center;
    font-size: 30px;
    color: #897e6d;
    font-family: Courier;
    margin: 0px;
    padding-top: 20px;
  }
  h2 {
    text-align: left;
    font-size: 20px;
    color: #897e6d;
    font-family: Courier;
    margin: 0px;
  }
  h3 {
    text-align: right;
    font-size: 15px;
    color: #897e6d;
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
  hr {
    border: 0;
    height: 1px;
    background: #897e6d;
    width: 100%;
  }
  p {
    color: #897e6d;
    margin-left: 20px;
  }
  a {
    color: #897e6d;
  }
`;

const Post: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
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
      <div>
        <Header headertext="iorin.io/diary" />
      </div>
      <main>
        <Article>
          <h1>{post.title}</h1>
          <h3>{post.date}</h3>
          <hr />
          <div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </Article>
      </main>
    </div>
  );
};

export default Post;
