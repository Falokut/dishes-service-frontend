import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: "0.0.0.0",
		port: 8080,
		strictPort: true,
		allowedHosts: true,
		cors: false,
		hmr: false,
		// ws: false,
	},
	preview: {
		host: process.env.SERVER_HOST ?? "0.0.0.0",
		port: Number(process.env.SERVER_PORT),
		strictPort: true,
		cors: process.env.SERVER_ENABLE_CORS == "true",
	},
});
