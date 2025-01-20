import { Main } from './app/Main';
import { Footer, Header } from './components/layout';

function MyApp() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="sm:px-4">
				<Header />
			</div>
			<div className="flex-grow flex flex-col h-full p-2">
				<Main />
			</div>
			<Footer />
		</div>
	);
}

export default MyApp;
