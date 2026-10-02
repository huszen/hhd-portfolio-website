'use client';

import { Cat, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/portfolio';
import TechBadge from './TechBadge';

interface ProjectCardProps {
  project: Project;
}

// Reusable card component to showcase a single portfolio project
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex flex-col bg-bg-card border border-border-main rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {/* Banner / Image Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-bg-main">
        {project.bannerUrl ? (
          <Image src={project.bannerUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">No Preview Available</div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">{project.title}</h3>

        <p className="mt-2 text-sm text-text-muted line-clamp-2 leading-relaxed flex-1">{project.shortDescription}</p>

        {/* Tech Stack List */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 my-4">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-border-main flex items-center justify-between mt-auto">
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-text-main hover:text-primary transition-colors group/link">
            <span>Read Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main transition-colors" title="View Source Code">
                <Cat className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main transition-colors" title="Live Demo">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
