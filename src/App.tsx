import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Redirect, Route, Switch } from 'wouter';
import { Landing } from './app/Landing';
import { Layout } from './app/Layout';
import { Project } from './app/project/Project';
import { ProjectList } from './app/projects/Projects';
import { Todo } from './app/todo/Todo';
import { Todos } from './app/todos/Todos';
import { Pricing } from './app/pricing/Pricing';

function MyApp() {
	return (
		<>
			<SignedIn>
				<Layout>
					<Switch>
						<Route path="/">{() => <Redirect to="/todos" />}</Route>
						<Route path="/todos" component={Todos} />

						<Route path="/todos/:todoId">
							{(params) => <Todo id={params.todoId} />}
						</Route>

						<Route path="/projects/:projectId/todos/:todoId">
							{(params) => <Todo id={params.todoId} />}
						</Route>
						<Route path="/projects/:projectId/todos/">
							{(params) => <Redirect to={`/projects/${params.projectId}`} replace />}
						</Route>

						<Route path="/projects/:projectId">
							{(params) => <Project id={params.projectId} />}
						</Route>
						<Route path="/projects" component={ProjectList} />

						<Route path="/pricing" component={Pricing} />

						{/* Default route in a switch */}
						<Route>404: No such page!</Route>
					</Switch>
				</Layout>
			</SignedIn>
			<SignedOut>
				<Landing />
			</SignedOut>
		</>
	);
}

export default MyApp;
