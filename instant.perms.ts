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
		bind: ['isOwner', "auth.id != null && auth.id == data.ref('owner.id')"],
	},
} satisfies InstantRules;

export default rules;
