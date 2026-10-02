'use client';

interface TechBadgeProps {
  name: string;
}

// Reusable badge component to display technology stack or skill tags
export default function TechBadge({ name }: TechBadgeProps) {
  return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-bg-main border border-border-main text-text-muted hover:text-text-main transition-colors">{name}</span>;
}
