import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 80,
        proxy: {
            "/api": {
                // target: "https://eventers-backend.vercel.app",
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: true,
            },
        },
    },
    plugins: [react()],
});
