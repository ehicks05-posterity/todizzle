import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import type { ReactNode } from 'react';
import { useResolvedTheme } from './components/theme-provider';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

export const ThemedClerkProvider = ({ children }: { children: ReactNode }) => {
	const theme = useResolvedTheme();
	return (
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			afterSignOutUrl="/"
			appearance={{ baseTheme: theme === 'light' ? undefined : dark }}
		>
			{children}
		</ClerkProvider>
	);
};
