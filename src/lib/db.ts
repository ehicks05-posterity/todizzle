import { i, init } from '@instantdb/react';

const _schema = i.schema({
	entities: {},
	rooms: {
		// 1. `chat` is the `roomType`
		chat: {
			// 2. Choose what presence looks like here
			presence: i.entity({
				name: i.string(),
				status: i.string(),
				color: i.string(),
			}),
			topics: {
				// 3. You can define payloads for different topics here
				sendEmoji: i.entity({
					emoji: i.string(),
				}),
			},
		},
	},
});

// This helps Typescript display better intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;

const APP_ID = import.meta.env.VITE_APP_ID;
export const db = init({ appId: APP_ID, schema: _schema });
