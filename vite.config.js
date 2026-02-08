import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdownRawPlugin from "vite-raw-plugin";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/markdown2pdf/",
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    markdownRawPlugin({
      fileRegex: /\.md$/,
    }),
    {
      name: "copy-index-to-404",
      closeBundle() {
        // HACK: 将 index.html 复制为 404.html，解决 GitHub Pages SPA 刷新问题。
        // TODO: 如果将来迁移到支持 History API 的静态服务器或自托管服务，可以移除该 HACK
        const outDir = "dist";
        const indexPath = path.resolve(outDir, "index.html");
        const notFoundPath = path.resolve(outDir, "404.html");
        fs.copyFileSync(indexPath, notFoundPath);
      },
    },
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
