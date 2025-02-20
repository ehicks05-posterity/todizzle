import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemedClerkProvider } from './components/ThemedClerkProvider';
import { ThemeProvider } from './components/theme-provider';
import './index.css';

const container = document.getElementById('root');
createRoot(container as Element).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<ThemedClerkProvider>
				<App />
			</ThemedClerkProvider>
		</ThemeProvider>
	</StrictMode>,
);
