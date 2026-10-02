'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Quote, Undo, Redo } from 'lucide-react';

interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TipTapEditor({ value, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[180px] p-4 bg-bg-card border border-border-main border-t-0 rounded-b-lg focus:outline-none text-text-main text-sm',
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
    <div className="rounded-lg overflow-hidden border border-border-main">
      {/* Toolbar Menu */}
      <div className="bg-bg-main border-b border-border-main p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition cursor-pointer ${editor.isActive('bold') ? 'bg-bg-card text-primary font-bold' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition cursor-pointer ${editor.isActive('italic') ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-border-main my-auto mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded transition cursor-pointer ${editor.isActive('heading', { level: 2 }) ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded transition cursor-pointer ${editor.isActive('heading', { level: 3 }) ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-border-main my-auto mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition cursor-pointer ${editor.isActive('bulletList') ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded transition cursor-pointer ${editor.isActive('orderedList') ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded transition cursor-pointer ${editor.isActive('blockquote') ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-border-main my-auto mx-1" />

        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-1.5 rounded text-text-muted hover:bg-bg-card hover:text-text-main transition cursor-pointer" title="Undo">
          <Undo className="w-4 h-4" />
        </button>

        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-1.5 rounded text-text-muted hover:bg-bg-card hover:text-text-main transition cursor-pointer" title="Redo">
          <Redo className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
