import type { AppSchema } from '@/components/lib/db';
import type { InstaQLEntity } from '@instantdb/react';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Todo = InstaQLEntity<AppSchema, 'todos', { category: {} }>;
export type Category = InstaQLEntity<AppSchema, 'categories'>;
