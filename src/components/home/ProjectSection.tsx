'use client';

import { FolderGit2 } from 'lucide-react';
import { Project } from '@/types/portfolio';
import ProjectCard from '../ui/ProjectCard';

interface ProjectSectionProps {
  projects: Project[];
}

// Featured projects section displaying a grid of ProjectCard Components.

export default function ProjectsSection({ projects }: ProjectSectionProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 border-t border-border-main">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-1">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">Featured Projects</h2>
          <p className="text-sm text-text-muted max-w-xl mx-auto">A selection of recent development projects, applications, and case studies</p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
