import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default ({ mode }) => {
  const env = mode || process.env.NODE_ENV;
  return defineConfig({
    plugins: [react()],
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
