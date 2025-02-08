import { useEditor } from 'novel';
import { useEffect } from 'react';

// Issue: this is meant to get instant updates from changes made from another device.
// The problem is it closes the bubble menu.
export function ExternalContentSync({ content }: { content: string }) {
	const { editor } = useEditor();

	useEffect(() => {
		editor?.commands.setContent(JSON.parse(content));
	}, [content, editor]);

	return null;
}
