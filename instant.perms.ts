// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
	attrs: {
		allow: {
			create: "false",
		},
	},
	todos: {
		bind: ["isOwner", "auth.id != null && auth.id in data.ref('owner.id')"],
		allow: {
			view: "isOwner",
			create: "isOwner",
			delete: "isOwner",
			update: "isOwner",
		},
	},
	$users: {
		allow: {
			view: "auth.id == data.id",
			create: "false",
			update: "false",
			delete: "false",
		},
	},
	$default: {
		allow: {
			$default: "false",
		},
	},
	products: {
		allow: {
			view: "true",
			create: "false",
			delete: "false",
			update: "false",
		},
	},
	projects: {
		bind: ["isOwner", "auth.id != null && auth.id in data.ref('owner.id')"],
		allow: {
			view: "isOwner",
			create: "isOwner",
			delete: "isOwner",
			update: "isOwner",
		},
	},
	customers: {
		bind: ["isOwner", "auth.id != null && auth.id in data.ref('owner.id')"],
		allow: {
			view: "isOwner",
			create: "false",
			delete: "false",
			update: "false",
		},
	},
} satisfies InstantRules;

export default rules;
