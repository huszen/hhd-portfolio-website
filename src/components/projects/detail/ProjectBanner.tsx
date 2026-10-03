'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Project } from '@/types/portfolio';

interface ProjectBannerProps {
  bannerUrl?: string;
  title: string;
}

export default function ProjectBanner({ bannerUrl, title }: ProjectBannerProps) {
  if (bannerUrl) {
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border-main bg-bg-card shadow-sm">
        <Image src={bannerUrl} alt={title} fill priority sizes="(max-width: 1200px) 100vw, 896px" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-bg-card via-bg-main to-bg-card border border-border-main flex flex-col items-center justify-center p-6 text-center select-none">
      <Sparkles className="w-8 h-8 text-text-muted mb-2 opacity-50" />
      <span className="text-xl font-bold text-text-main">{title}</span>
    </div>
  );
}
