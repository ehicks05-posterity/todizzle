import type { Todo } from "@/lib/types";

const getCompletion = (todos: Todo[]) => {
  const denominator = todos.filter((todo) => todo.status !== 'canceled').length;
  const numerator =
    todos.filter((todo) => todo.status === 'done').length +
    todos.filter((todo) => todo.status === 'inProgress').length * 0.5;

  if (denominator === 0) return 0;
  return numerator / denominator;
};

export const getCompletionPercent = (todos: Todo[]) =>
  Intl.NumberFormat('en-US', { style: 'percent' }).format(getCompletion(todos));