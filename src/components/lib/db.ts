import { i, init } from '@instantdb/react';
import type { Priority, Status } from './types';

const _schema = i.schema({
	entities: {
		$users: i.entity({
			email: i.string().unique().indexed(),
		}),
		todos: i.entity({
			createdAt: i.date(),
			description: i.string(),
			dueDate: i.date(),
			priority: i.string<Priority>(),
			status: i.string<Status>(),
			title: i.string(),
		}),
		projects: i.entity({
			color: i.string(),
			description: i.string(),
			icon: i.string(),
			title: i.string(),
		}),
	},
	links: {
		todoProject: {
			forward: { on: 'todos', has: 'one', label: 'project' },
			reverse: { on: 'projects', has: 'many', label: 'todos' },
		},
		userProjects: {
			forward: { on: '$users', has: 'many', label: 'projects' },
			reverse: { on: 'projects', has: 'one', label: 'owner' },
		},
		userTodos: {
			forward: { on: '$users', has: 'many', label: 'todos' },
			reverse: { on: 'todos', has: 'one', label: 'owner' },
		},
	},
});

// This helps Typescript display better intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;

const APP_ID = import.meta.env.VITE_INSTANT_APP_ID;
export const db = init({ appId: APP_ID, schema: _schema });
