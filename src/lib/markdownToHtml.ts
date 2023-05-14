import { remark } from "remark";
import html from "remark-html";

/**
 * Markdown を解析して HTML にして返す
 * @param markdown Markdown ファイル名
 * @returns HTML
 */
const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

export default markdownToHtml;
