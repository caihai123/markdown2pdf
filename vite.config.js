import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdownRawPlugin from "vite-raw-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    markdownRawPlugin({
      fileRegex: /\.md$/,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
