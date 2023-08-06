import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import inlineCss from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import eslint from "vite-plugin-eslint";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default ({ mode }) => {
  const env = mode || process.env.NODE_ENV;
  return defineConfig({
    plugins: [
      react(),
      eslint(),
      dts({
        insertTypesEntry: true,
      }),
      inlineCss(),
      viteStaticCopy({
        targets: [
          { src: "./src/index.scss", dest: "." },
          { src: "./src/style", dest: "." },
        ],
      }),
    ],
    css: {
      modules: {
        generateScopedName:
          env === "production" ? "[hash:base64:8]" : undefined,
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${__dirname.replace(
            /\\/g,
            "/",
          )}/src/index.scss" as *;\n\n`,
        },
      },
    },
    build: {
      minify: env === "production",
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, "src/index.lib.ts"),
        name: "index",
        formats: ["es", "umd"],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "react-router-dom", "react-router"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  });
};
