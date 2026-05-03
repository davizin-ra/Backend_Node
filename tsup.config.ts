import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "build",
  format: ["cjs"],
  target: "node18",
  sourcemap: true,
  clean: true,
  splitting: false
});