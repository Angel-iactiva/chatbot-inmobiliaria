import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "chatbot-inmobiliaria",
  build: {
    lib: {
      entry: "./src/embed-chatbot.tsx", // Archivo de entrada
      name: "ChatbotWidget",
      fileName: "chatbot-widget",
      formats: ["iife"], // Formato para embeberlo en un <script>
    },
    outDir: "docs", // Cambia la carpeta de salida a "docs".
  },
});
