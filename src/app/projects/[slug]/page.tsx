'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { getProjectBySlug } from '@/lib/firestore';

import ProjectHeader from '@/components/projects/detail/ProjectHeader';
import ProjectBanner from '@/components/projects/detail/ProjectBanner';
import ProjectContent from '@/components/projects/detail/ProjectContent';
import ProjectPreviews from '@/components/projects/detail/ProjectPreviews';
import ProjectDetailSkeleton from '@/components/projects/detail/ProjectDetailSkeleton';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (error) {
        console.error('Failed to load project details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-bg-card border border-border-main p-8 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold text-text-main mb-2">Project Not Found</h1>
          <p className="text-sm text-text-muted mb-6">The project you are looking for does not exist or may have been removed.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-text font-medium text-sm hover:bg-primary-hover transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main text-text-main py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto space-y-10">
        <ProjectHeader project={project} />
        <ProjectBanner bannerUrl={project.bannerUrl} title={project.title} />
        <ProjectContent content={project.content} />
        <ProjectPreviews previewImages={project.previewImages} title={project.title} />
      </article>
    </div>
  );
}
