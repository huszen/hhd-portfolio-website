'use client';
import { useEditor, useEditorState, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Code, Undo, Redo } from 'lucide-react';
interface TipTapEditorProps {
  content: string;
  onChange: (richText: string) => void;
}
export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: [
          'prose max-w-none focus:outline-none min-h-[250px] p-4',
          'text-text-main',
          '[&_h1]:text-text-main [&_h2]:text-text-main [&_h3]:text-text-main',
          '[&_strong]:text-text-main [&_b]:text-text-main',
          '[&_code]:text-text-main',
          'selection:bg-primary selection:text-primary-text',
        ].join(' '),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  /* * Subscribe to TipTap editor state changes. * * This makes React re-render the toolbar when the cursor * moves between different formatting contexts. */ const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive('bold') ?? false,
      isItalic: editor?.isActive('italic') ?? false,
      isHeading1: editor?.isActive('heading', { level: 1 }) ?? false,
      isHeading2: editor?.isActive('heading', { level: 2 }) ?? false,
      isBulletList: editor?.isActive('bulletList') ?? false,
      isOrderedList: editor?.isActive('orderedList') ?? false,
      isBlockquote: editor?.isActive('blockquote') ?? false,
      isCodeBlock: editor?.isActive('codeBlock') ?? false,
    }),
  });
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
      {' '}
      {/* Toolbar */}{' '}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-700 bg-gray-800/50">
        {' '}
        {/* Bold */}{' '}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white ${editorState.isBold ? 'bg-gray-600 text-white ring-1 ring-gray-500' : ''}`}
          title="Bold"
        >
          {' '}
          <Bold className="w-4 h-4" />{' '}
        </button>{' '}
        {/* Italic */}{' '}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white ${editorState.isItalic ? 'bg-gray-600 text-white ring-1 ring-gray-500' : ''}`}
          title="Italic"
        >
          {' '}
          <Italic className="w-4 h-4" />{' '}
        </button>{' '}
        <div className="w-[1px] h-6 bg-gray-700 mx-1" /> {/* Heading 1 */}{' '}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white ${editorState.isHeading1 ? 'bg-gray-600 text-white ring-1 ring-gray-500' : ''}`}
          title="Heading 1"
        >
          {' '}
          <Heading1 className="w-4 h-4" />{' '}
        </button>{' '}
        {/* Heading 2 */}{' '}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white ${editorState.isHeading2 ? 'bg-gray-600 text-white ring-1 ring-gray-500' : ''}`}
          title="Heading 2"
        >
          {' '}
          <Heading2 className="w-4 h-4" />{' '}
        </button>{' '}
        <div className="w-[1px] h-6 bg-gray-700 mx-1" /> {/* Bullet List */}{' '}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white ${editorState.isBulletList ? 'bg-gray-600 text-white ring-1 ring-gray-500' : ''}`}
          title="Bullet List"
        >
          {' '}
          <List className="w-4 h-4" />{' '}
        </button>{' '}
        {/* Numbered List */}{' '}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white ${editorState.isOrderedList ? 'bg-gray-600 text-white ring-1 ring-gray-500' : ''}`}
          title="Numbered List"
        >
          {' '}
          <ListOrdered className="w-4 h-4" />{' '}
        </button>{' '}
        {/* Blockquote */}{' '}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white ${editorState.isBlockquote ? 'bg-gray-600 text-white ring-1 ring-gray-500' : ''}`}
          title="Quote"
        >
          {' '}
          <Quote className="w-4 h-4" />{' '}
        </button>{' '}
        {/* Code Block */}{' '}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white ${editorState.isCodeBlock ? 'bg-gray-600 text-white ring-1 ring-gray-500' : ''}`}
          title="Code Block"
        >
          {' '}
          <Code className="w-4 h-4" />{' '}
        </button>{' '}
        <div className="w-[1px] h-6 bg-gray-700 mx-1" /> {/* Undo */}{' '}
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white" title="Undo">
          {' '}
          <Undo className="w-4 h-4" />{' '}
        </button>{' '}
        {/* Redo */}{' '}
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white" title="Redo">
          {' '}
          <Redo className="w-4 h-4" />{' '}
        </button>{' '}
      </div>{' '}
      {/* Text Editor */} <EditorContent editor={editor} />{' '}
    </div>
  );
}
