// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from '@instantdb/react';

const rules = {
	attrs: { allow: { create: 'false' } },
	projects: {
		bind: ['isOwner', "auth.id != null && auth.id in data.ref('owner.id')"],
		allow: {
			view: 'isOwner',
			create: 'isOwner',
			update: 'isOwner',
			delete: 'isOwner',
		},
	},
	todos: {
		bind: ['isOwner', "auth.id != null && auth.id in data.ref('owner.id')"],
		allow: {
			view: 'isOwner',
			create: 'isOwner',
			update: 'isOwner',
			delete: 'isOwner',
		},
	},
} satisfies InstantRules;

export default rules;
