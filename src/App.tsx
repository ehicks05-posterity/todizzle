import { Redirect, Route, Switch } from 'wouter';
import { Project } from './app/project/Project';
import { ProjectList } from './app/projects/Projects';
import { Todo } from './app/todo/Todo';
import { Todos } from './app/todos/Todos';
import { ThemeProvider } from './components/theme-provider';

function MyApp() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Switch>
				<Route path="/">{() => <Redirect to="/todos" />}</Route>
				<Route path="/todos" component={Todos} />

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
