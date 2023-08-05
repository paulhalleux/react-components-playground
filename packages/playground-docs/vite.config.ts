import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default ({ mode }: { mode: string }) => {
  const env = mode || process.env.NODE_ENV;
  return defineConfig({
    plugins: [react({ include: [/\.tsx?$/] })],
    css: {
      modules: {
        generateScopedName:
          env === "production" ? "[hash:base64:8]" : undefined,
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@paulhalleux/react-playground/index.scss" as *;\n\n`,
        },
      },
    },
  });
};
