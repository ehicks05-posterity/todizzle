interface TodoItem {
	id: string;
	categoryId?: string;
	title: string;
	description?: string;
	dueDate?: Date;
}

interface Category {
	id: string;
	name: string;
}
