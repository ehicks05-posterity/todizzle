import type { InstaQLEntity } from '@instantdb/react';
import type { AppSchema } from '../../instant.schema';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Todo = InstaQLEntity<AppSchema, 'todos', { project: {} }>;
export type Project = InstaQLEntity<AppSchema, 'projects'>;

export type Status = 'backlog' | 'todo' | 'inProgress' | 'done' | 'canceled';
export type Priority = 'none' | 'low' | 'medium' | 'high' | 'urgent';
