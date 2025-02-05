import type { Priority, Status } from '@/components/lib/types';
import { i } from '@instantdb/react';

const _schema = i.schema({
	// We inferred 2 attributes!
	// Take a look at this schema, and if everything looks good,
	// run `push schema` again to enforce the types.
	entities: {
		$files: i.entity({
			'content-disposition': i.string().indexed(),
			'content-type': i.string().indexed(),
			'key-version': i.number(),
			metadata: i.string(),
			path: i.string().indexed(),
			size: i.number().indexed(),
			status: i.string().indexed(),
			url: i.string(),
		}),
		$users: i.entity({
			email: i.string().unique().indexed(),
		}),
		projects: i.entity({
			color: i.string(),
			description: i.string(),
			icon: i.string(),
			title: i.string(),
		}),
		todos: i.entity({
			createdAt: i.date(),
			description: i.string(),
			dueDate: i.date(),
			priority: i.string<Priority>(),
			status: i.string<Status>(),
			title: i.string(),
		}),
	},
	links: {
		todosProject: {
			forward: {
				on: 'todos',
				has: 'one',
				label: 'project',
			},
			reverse: {
				on: 'projects',
				has: 'many',
				label: 'todos',
			},
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
	// If you use presence, you can define a room schema here
	// https://www.instantdb.com/docs/presence-and-topics#typesafety
	rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
