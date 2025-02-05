/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_INSTANT_APP_ID: string;
	readonly VITE_CLERK_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
