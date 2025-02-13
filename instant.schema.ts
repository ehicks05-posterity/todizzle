import type { Priority, Status } from '@/lib/types';
import { i } from '@instantdb/react';

const _schema = i.schema({
	entities: {
		$files: i.entity({
			'content-disposition': i.string().indexed(),
			'content-type': i.string().indexed(),
			'key-version': i.number(),
			path: i.string().unique().indexed(),
			size: i.number().indexed(),
			url: i.string(),
		}),
		$users: i.entity({
			email: i.string().unique().indexed(),
		}),
		customers: i.entity({
			customerId: i.string().unique(),
			activeProductId: i.string(),
		}),
		products: i.entity({
			productId: i.string().unique(),
			projectLimit: i.number(),
			todoLimit: i.number(),
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
		userProduct: {
			forward: { on: 'products', has: 'many', label: 'subscribers' },
			reverse: { on: '$users', has: 'one', label: 'product' },
		},
		userProjects: {
			forward: { on: 'projects', has: 'one', label: 'owner' },
			reverse: { on: '$users', has: 'many', label: 'projects', onDelete: 'cascade' },
		},
		userTodos: {
			forward: { on: 'todos', has: 'one', label: 'owner' },
			reverse: { on: '$users', has: 'many', label: 'todos', onDelete: 'cascade' },
		},
		userCustomers: {
			forward: { on: 'customers', has: 'one', label: 'owner' },
			reverse: { on: '$users', has: 'one', label: 'customer' },
		},
	},
	rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema { }
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
