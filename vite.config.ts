import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  base: "/03-react-movies/",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
