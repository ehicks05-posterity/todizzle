import { Route, Switch } from 'wouter';
import { Main } from './app/Main';
import { Todo } from './app/todo/Todo';
import { ThemeProvider } from './components/theme-provider';
import { Category } from './app/category/Category';

function MyApp() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Switch>
				<Route path="/" component={Main} />

				<Route path="/todos/:id">{(params) => <Todo id={params.id} />}</Route>
				<Route path="/categories/:id">
					{(params) => <Category id={params.id} />}
				</Route>

				{/* Default route in a switch */}
				<Route>404: No such page!</Route>
			</Switch>
		</ThemeProvider>
	);
}

export default MyApp;
