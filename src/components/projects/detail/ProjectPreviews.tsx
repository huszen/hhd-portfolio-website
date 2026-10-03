'use client';

import Image from 'next/image';

interface ProjectPreviewProps {
  previewImages?: string[];
  title: string;
}

export default function ProjectPreviews({ previewImages, title }: ProjectPreviewProps) {
  if (!previewImages || previewImages.length === 0) return null;

  return (
    <section className="space-y-4 pt-6 border-t border-border-main">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-text-main">Project Previews</h2>
        <p className="text-sm text-text-muted">Visual gallery showcasing various views and screenshots of the project.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previewImages.map((imageUrl, index) => (
          <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-border-main bg-bg-card">
            <Image src={imageUrl} alt={`${title} preview screenshot ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
