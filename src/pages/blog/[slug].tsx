import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getAllBlogs, getBlogBySlug } from "../../lib/blog-api";
import markdownToHtml from "../../lib/markdownToHtml";
import { PanoramaSharp } from "@material-ui/icons";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
  console.log("getStaticPaths");
  const posts = getAllBlogs(["slug"]);
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
  console.log("getStaticProps");
  const post = getBlogBySlug(params.slug, ["slug", "title", "date", "content"]);
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

const Post: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Hello world!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <article>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.grid}>
            <div>
              <p>{post.date}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>
      </main>
      <footer className={styles.footer}>
        <p>Powered by Next.js.</p>
      </footer>
    </div>
  );
};

export default Post;
