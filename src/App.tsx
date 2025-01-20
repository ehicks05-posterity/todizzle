import { Main } from './app/Main';
import { Footer } from './components/layout';
import { ThemeProvider } from './components/theme-provider';

function MyApp() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Main />
		</ThemeProvider>
	);
}

export default MyApp;
