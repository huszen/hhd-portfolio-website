// src/components/admin/projects/ProjectCard.tsx
'use client';

import Image from 'next/image';
import { Project } from '@/types/portfolio';
import { Pencil, Trash2, ExternalLink, Cat, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="bg-bg-card border border-border-main rounded-xl overflow-hidden flex flex-col justify-between hover:border-primary/50 transition">
      <div>
        {/* Banner Thumbnail */}
        <div className="relative w-full h-48 bg-bg-main border-b border-border-main flex items-center justify-center overflow-hidden">
          {project.bannerUrl ? (
            <Image src={project.bannerUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
          ) : (
            <div className="w-full h-full bg-bg-main p-6 flex flex-col justify-between items-start">
              <span className="p-2 bg-bg-card rounded-md border border-border-main text-text-muted">
                <ImageIcon className="w-4 h-4" />
              </span>
              <h4 className="text-base font-semibold text-text-main line-clamp-2">{project.title}</h4>
            </div>
          )}
        </div>

        {/* Info Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-text-main mb-2 line-clamp-1">{project.title}</h3>
          <p className="text-text-muted text-sm mb-4 line-clamp-2">{project.shortDescription}</p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack?.map((tech, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 text-xs rounded-md font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3 border-t border-border-main flex justify-between items-center bg-bg-main/50">
        <div className="flex gap-2 text-text-muted">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text-main transition" title="GitHub Repository">
              <Cat className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text-main transition" title="Live Demo">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(project)} className="p-1.5 hover:bg-bg-main rounded text-text-muted hover:text-primary transition cursor-pointer" title="Edit">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => project.id && onDelete(project.id)} className="p-1.5 hover:bg-bg-main rounded text-text-muted hover:text-red-500 transition cursor-pointer" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
