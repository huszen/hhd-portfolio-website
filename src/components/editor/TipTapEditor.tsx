'use client';

import { useEditor, EditorContent } from '@tiptap/react';
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
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[250px] p-4 text-gray-200',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
      {/* Toolbar Format Teks */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-700 bg-gray-800/50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${editor.isActive('bold') ? 'bg-gray-700 text-white' : ''}`} title="Bold">
          <Bold className="w-4 h-4" />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${editor.isActive('italic') ? 'bg-gray-700 text-white' : ''}`} title="Italic">
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-gray-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 text-white' : ''}`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-white' : ''}`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-gray-700 mx-1" />

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${editor.isActive('bulletList') ? 'bg-gray-700 text-white' : ''}`} title="Bullet List">
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${editor.isActive('orderedList') ? 'bg-gray-700 text-white' : ''}`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${editor.isActive('blockquote') ? 'bg-gray-700 text-white' : ''}`} title="Quote">
          <Quote className="w-4 h-4" />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${editor.isActive('codeBlock') ? 'bg-gray-700 text-white' : ''}`} title="Code Block">
          <Code className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-gray-700 mx-1" />

        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded hover:bg-gray-700 text-gray-300" title="Undo">
          <Undo className="w-4 h-4" />
        </button>

        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded hover:bg-gray-700 text-gray-300" title="Redo">
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Area Menulis Teks */}
      <EditorContent editor={editor} />
    </div>
  );
}
