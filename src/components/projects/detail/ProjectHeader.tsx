'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Cat, Calendar } from 'lucide-react';
import { Project } from '@/types/portfolio';
import TechBadge from '@/components/ui/TechBadge';

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="space-y-6">
      {/* Top Back Navigation */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Title & Short Description */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">{project.title}</h1>
        <p className="text-base sm:text-lg text-text-muted leading-relaxed">{project.shortDescription}</p>
      </div>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-border-main/60 py-4">
        {project.createdAt && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
            <Calendar className="w-4 h-4 text-text-muted" />
            <span>
              {new Date(project.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl border border-border-main bg-bg-card text-text-main hover:border-primary/50 transition-colors"
            >
              <Cat className="w-4 h-4" />
              <span>Repository</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl bg-primary text-primary-text hover:bg-primary-hover transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Tech Stack Badges */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Technologies Used</span>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
