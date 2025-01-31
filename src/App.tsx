import { Redirect, Route, Switch } from 'wouter';
import { Main } from './app/Main';
import { Project } from './app/project/Project';
import { ProjectList } from './app/projects/Projects';
import { Todo } from './app/todo/Todo';
import { ThemeProvider } from './components/theme-provider';

function MyApp() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Switch>
				<Route path="/">{() => <Redirect to="/todos" />}</Route>
				<Route path="/todos" component={Main} />

				<Route path="/todos/:id">{(params) => <Todo id={params.id} />}</Route>

				<Route path="/projects/:id">{(params) => <Project id={params.id} />}</Route>
				<Route path="/projects" component={ProjectList} />

				{/* Default route in a switch */}
				<Route>404: No such page!</Route>
			</Switch>
		</ThemeProvider>
	);
}

export default MyApp;
