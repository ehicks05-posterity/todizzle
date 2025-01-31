import { i, init } from '@instantdb/react';

const _schema = i.schema({
	entities: {
		$users: i.entity({
			email: i.string().unique().indexed(),
		}),
		todos: i.entity({
			title: i.string(),
			description: i.string(),
			dueDate: i.date(),
			status: i.string(),
		}),
		projects: i.entity({
			name: i.string(),
			icon: i.string(),
		}),
	},
	links: {
		todoProject: {
			forward: { on: 'todos', has: 'one', label: 'project' },
			reverse: { on: 'projects', has: 'many', label: 'todos' },
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
