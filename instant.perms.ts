// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from '@instantdb/react';

const rules = {
	attrs: { allow: { create: 'false' } },
	projects: {
		allow: {
			view: 'isOwner',
			create: 'isOwner',
			update: 'isOwner',
			delete: 'isOwner',
		},
		bind: ['isOwner', "auth.id != null && auth.id in data.ref('owner.id')"],
	},
	todos: {
		allow: {
			view: 'isOwner',
			create: 'isOwner',
			update: 'isOwner',
			delete: 'isOwner',
		},
		bind: ['isOwner', "auth.id != null && auth.id in data.ref('owner.id')"],
	},
} satisfies InstantRules;

export default rules;
