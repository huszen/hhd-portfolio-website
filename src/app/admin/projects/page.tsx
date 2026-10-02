// src/app/admin/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';
import { getProjects, addProject, updateProject, deleteProject } from '@/lib/firestore';
import ProjectCard from '@/components/admin/projects/ProjectCard';
import ProjectModal from '@/components/admin/projects/ProjectModal';
import { Plus } from 'lucide-react';

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
    if (confirm('Are you sure you want to delete this project?')) {
      const success = await deleteProject(id);
      if (success) {
        fetchProjects();
      } else {
        alert('Failed to delete project.');
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Projects Management</h1>
          <p className="text-text-muted text-sm">Manage your project portfolio and works.</p>
        </div>
        <button onClick={handleOpenAddModal} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-text px-4 py-2 rounded-lg font-medium transition text-sm cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Grid Projects */}
      {isLoading ? (
        <div className="text-center py-12 text-text-muted">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="bg-bg-card border border-border-main rounded-xl p-12 text-center text-text-muted">No projects added yet.</div>
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
