import markdownit from "markdown-it";
import hljs from "highlight.js";
import { full as emoji } from "markdown-it-emoji"; // 表情符号
import footnote from "markdown-it-footnote"; // 注脚
import katex from "@vscode/markdown-it-katex"; // 数学公式

const md = markdownit({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
        // eslint-disable-next-line no-unused-vars
      } catch (_) {
        return (
          '<pre><code class="hljs">' +
          md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      }
    }
  },
})
  .use(emoji /* , options */)
  .use(footnote)
  .use(katex);

export default md;
