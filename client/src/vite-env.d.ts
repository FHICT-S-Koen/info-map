/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AUTH0_DOMAIN: string
	readonly VITE_AUTH0_CLIENT_KEY: string
	readonly VITE_AUTH0_AUDIENCE: string
	readonly VITE_PROXY_URL: string
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
