import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [react()],
        server: {
            port: parseInt(process.env.VITE_PORT),
            proxy: {
                "/api": {
                    target: process.env.VITE_BACKEND,
                    changeOrigin: true,
                },
            },
        },
    });
}
