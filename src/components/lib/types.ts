import type { AppSchema } from '@/components/lib/db';
import type { InstaQLEntity } from '@instantdb/react';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Todo = InstaQLEntity<AppSchema, 'todos', { project: {} }>;
export type Project = InstaQLEntity<AppSchema, 'projects'>;

export type Status = 'backlog' | 'todo' | 'inProgress' | 'done' | 'canceled';
