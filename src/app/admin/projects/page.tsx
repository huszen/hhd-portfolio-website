// src/app/admin/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';
import { getProjects, addProject, updateProject, deleteProject } from '@/lib/firestore';
import ProjectCard from '@/components/admin/projects/ProjectCard';
import ProjectModal from '@/components/admin/projects/ProjectModal';
import { Plus, Loader2, FolderGit2 } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    // 1. Find project details to extract image URLs
    const projectToDelete = projects.find((p) => p.id === id);

    if (projectToDelete) {
      const imagesToDelete: string[] = [];

      // Extract main banner image
      if (projectToDelete.bannerUrl) {
        imagesToDelete.push(projectToDelete.bannerUrl);
      }

      // Extract array of preview screenshots/mockups
      if (Array.isArray(projectToDelete.previewImages) && projectToDelete.previewImages.length > 0) {
        imagesToDelete.push(...projectToDelete.previewImages);
      }

      // 2. Delete all associated images from Cloudinary CDN concurrently
      if (imagesToDelete.length > 0) {
        await Promise.all(
          imagesToDelete.map((url) =>
            fetch('/api/cloudinary/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url }),
            }).catch((err) => console.error('Failed to cleanup Cloudinary image:', url, err)),
          ),
        );
      }
    }

    // 3. Delete document from Firestore
    const success = await deleteProject(id);
    if (success) {
      fetchProjects();
    } else {
      alert('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar - Standardized Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-main pb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">Projects & Cases</h1>
          <p className="text-sm text-text-muted mt-0.5">Manage your project portfolio, case studies, and featured web applications.</p>
        </div>
        <button onClick={handleOpenAddModal} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-text rounded-lg text-sm font-semibold hover:opacity-90 transition shrink-0 self-start sm:self-auto cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Grid Projects & States */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-text-muted gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Loading projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border-main rounded-xl space-y-3">
          <FolderGit2 className="w-10 h-10 text-text-muted mx-auto opacity-50" />
          <p className="text-text-muted text-sm">No projects added yet.</p>
          <button onClick={handleOpenAddModal} className="text-xs text-primary hover:underline font-medium">
            + Add your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onEdit={handleOpenEditModal} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Modal Add / Edit Form */}
      <ProjectModal isOpen={isModalOpen} editingProject={editingProject} onClose={() => setIsModalOpen(false)} onSubmitSuccess={fetchProjects} addProjectFn={addProject} updateProjectFn={updateProject} />
    </div>
  );
}
