import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { glob, globSync, globStream, globStreamSync, Glob } from "glob";

type Post = {
  slug: string;
  content: string;
  title: string;
  date: string;
};

const diariesDirectory = path.join(process.cwd(), "content", "diary");
/**
 * postsDirectory/* 以下のディレクトリ名を取得する
 **/
export function getDiarySlugs() {
  const allDirents = fs.readdirSync(diariesDirectory, { withFileTypes: true });
  return allDirents
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);
}

/**
 * 指定したフィールド名から、記事のフィールドの値を取得する
 **/
export function getDiaryBySlug(slug: string, fields: string[] = []) {
  const fullPath = path.join(diariesDirectory, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Post = {
    slug: "",
    content: "",
    title: "",
    date: "",
  };

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "title" || field === "date") {
      items[field] = data[field];
    }
  });
  return items;
}

/**
 * すべての記事について、指定したフィールドの値を取得して返す
 * @param fields 取得するフィールド
 */

export function getAllDiaries(fields: string[] = []) {
  const slugs = getDiarySlugs();
  const posts = slugs
    .map((slug) => getDiaryBySlug(slug, fields))
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  return posts;
}
