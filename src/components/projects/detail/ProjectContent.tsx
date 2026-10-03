'use client';

interface ProjectContentProps {
  content: string;
}

export default function ProjectContent({ content }: ProjectContentProps) {
  if (!content) return null;

  return (
    <section className="bg-bg-card border border-border-main p-6 sm:p-10 rounded-2xl shadow-sm">
      <div
        className="prose prose-slate dark:prose-invert max-w-none 
          [--tw-prose-body:var(--text-main)] 
          [--tw-prose-headings:var(--text-main)] 
          [--tw-prose-links:var(--primary)] 
          [--tw-prose-bold:var(--text-main)] 
          [--tw-prose-code:var(--text-main)] 
          [--tw-prose-quotes:var(--text-muted)]
          [--tw-prose-pre-bg:var(--bg-main)]
          [--tw-prose-pre-code:var(--text-main)]
          [--tw-prose-borders:var(--border-main)]
          [&_pre]:border [&_pre]:border-border-main [&_pre]:rounded-xl [&_pre]:p-4
          [&_img]:rounded-xl [&_img]:border [&_img]:border-border-main"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
