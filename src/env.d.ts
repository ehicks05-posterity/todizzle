/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_INSTANT_APP_ID: string;
	readonly VITE_CLERK_PUBLISHABLE_KEY: string;
	readonly VITE_STRIPE_CUSTOMER_PORTAL_LINK: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
