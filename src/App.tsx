import { Route, Switch } from 'wouter';
import { Main } from './app/Main';
import { CategoryList } from './app/categories/Categories';
import { Category } from './app/category/Category';
import { Todo } from './app/todo/Todo';
import { ThemeProvider } from './components/theme-provider';

function MyApp() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Switch>
				<Route path="/" component={Main} />

				<Route path="/todos/:id">{(params) => <Todo id={params.id} />}</Route>

				<Route path="/categories/:id">
					{(params) => <Category id={params.id} />}
				</Route>
				<Route path="/categories" component={CategoryList} />

				{/* Default route in a switch */}
				<Route>404: No such page!</Route>
			</Switch>
		</ThemeProvider>
	);
}

export default MyApp;
