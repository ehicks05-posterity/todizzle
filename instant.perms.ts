// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from '@instantdb/react';

const rules = {
	attrs: { allow: { create: 'false' } },
	// default all permissions on all entities
	$default: {
		allow: {
			$default: "false"
		}
	},
	// NOTE: $users is read-only and defaults to can-view-self only.
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
	customers: {
		bind: ['isOwner', "auth.id != null && auth.id in data.ref('owner.id')"],
		allow: {
			view: 'isOwner',
			create: 'false',
			update: 'false',
			delete: 'false',
		},
	},
} satisfies InstantRules;

export default rules;
