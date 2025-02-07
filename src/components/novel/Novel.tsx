import {
	EditorBubble,
	EditorCommand,
	EditorCommandEmpty,
	EditorCommandItem,
	EditorCommandList,
	EditorContent,
	type EditorInstance,
	EditorRoot,
	type JSONContent,
	handleCommandNavigation,
	useEditor,
} from 'novel';
import './prosemirror.css';
import './globals.css';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { defaultExtensions } from './extensions';
import { ColorSelector } from './selectors/ColorSelector';
import { LinkSelector } from './selectors/LinkSelector';
import { NodeSelector } from './selectors/NodeSelector';
import { TextButtons } from './selectors/TextButtons';
import { slashCommand, suggestionItems } from './suggestionItems';

// Issue: this is meant to get instant updates from changes made from another device.
// The problem is it closes the bubble menu.
function ExternalContentSync({ content }: { content: string }) {
	const { editor } = useEditor();

	useEffect(() => {
		editor?.commands.setContent(JSON.parse(content));
	}, [content, editor]);

	return null;
}

export default ({
	content,
	onUpdate,
}: { content: string; onUpdate: (content: string) => void }) => {
	const [initialContent] = useState<JSONContent | undefined>(JSON.parse(content));
	const [saveStatus, setSaveStatus] = useState('Saved');
	const [charsCount, setCharsCount] = useState();

	const [openNode, setOpenNode] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [openLink, setOpenLink] = useState(false);
	const [openAI, setOpenAI] = useState(false);

	const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
		const json = editor.getJSON();
		setCharsCount(editor.storage.characterCount.words());
		onUpdate(JSON.stringify(json));
		setSaveStatus('Saved');
	}, 500);

	return (
		<div>
			<EditorRoot>
				<EditorContent
					extensions={[...defaultExtensions, slashCommand]}
					initialContent={initialContent}
					onUpdate={({ editor }) => {
						setSaveStatus('Unsaved');
						debouncedUpdates(editor);
					}}
					onCreate={({ editor }) => {
						setCharsCount(editor.storage.characterCount.words());
					}}
					editorProps={{
						handleDOMEvents: {
							keydown: (_view, event) => handleCommandNavigation(event),
						},
						attributes: {
							class:
								'prose prose-sm dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
							spellcheck: 'false',
						},
					}}
				>
					{/* <ExternalContentSync content={content} /> */}
					<EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
						<EditorCommandEmpty className="px-2 text-muted-foreground">
							No results
						</EditorCommandEmpty>
						<EditorCommandList>
							{suggestionItems.map((item) => (
								<EditorCommandItem
									value={item.title}
									onCommand={(val) => item.command?.(val)}
									className={
										'flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent '
									}
									key={item.title}
								>
									<div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
										{item.icon}
									</div>
									<div>
										<p className="font-medium">{item.title}</p>
										<p className="text-xs text-muted-foreground">
											{item.description}
										</p>
									</div>
								</EditorCommandItem>
							))}
						</EditorCommandList>
					</EditorCommand>
					<EditorBubble
						tippyOptions={{ placement: openAI ? 'bottom-start' : 'top' }}
						className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
					>
						<NodeSelector open={openNode} onOpenChange={setOpenNode} />
						<LinkSelector open={openLink} onOpenChange={setOpenLink} />
						<TextButtons />
						<ColorSelector open={openColor} onOpenChange={setOpenColor} />
					</EditorBubble>
				</EditorContent>
			</EditorRoot>
			<div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
				<div
					className={`rounded-lg bg-accent px-2 py-1 text-sm ${saveStatus === 'Saved' ? 'text-green-500' : 'text-muted-foreground'}`}
				>
					{saveStatus}
				</div>
				{/* TODO: fix word count not updating */}
				{/* <div
					className={
						charsCount
							? 'rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'
							: 'hidden'
					}
				>
					{charsCount} Words
				</div> */}
			</div>
		</div>
	);
};
