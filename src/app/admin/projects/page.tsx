'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';
import { getProjects, addProject, updateProject, deleteProject } from '@/lib/firestore';
import ImageUploader from '@/components/admin/ImageUploader';
import MultiImageUploader from '@/components/admin/MultiImageUploader';
import TipTapEditor from '@/components/admin/TipTapEditor';
import Image from 'next/image';
import { Plus, Pencil, Trash2, ExternalLink, Cat, X, Image as ImageIcon } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [content, setContent] = useState('');

  // State for preview images array
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Load Data
  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      );
    }
  };

  // Tech Stack Handlers
  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && techInput.trim()) {
      e.preventDefault();
      const newTag = techInput.trim().replace(/^,/, '');
      if (newTag && !techStack.includes(newTag)) {
        setTechStack([...techStack, newTag]);
      }
      setTechInput('');
    }
  };

  const handleRemoveTech = (tagToRemove: string) => {
    setTechStack(techStack.filter((tag) => tag !== tagToRemove));
  };

  // Open Modal Add/Edit
  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id || null);
      setTitle(project.title);
      setSlug(project.slug);
      setShortDescription(project.shortDescription);
      setBannerUrl(project.bannerUrl || '');
      setPreviewImages(project.previewImages || []); // Load gambar preview yang tersimpan
      setTechStack(project.techStack || []);
      setGithubUrl(project.githubUrl || '');
      setDemoUrl(project.demoUrl || '');
      setContent(project.content || '');
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setShortDescription('');
    setBannerUrl('');
    setPreviewImages([]);
    setTechInput('');
    setTechStack([]);
    setGithubUrl('');
    setDemoUrl('');
    setContent('');
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const projectData: Omit<Project, 'id'> = {
      title,
      slug,
      shortDescription,
      bannerUrl: bannerUrl.trim() || undefined,
      previewImages: previewImages.length > 0 ? previewImages : undefined,
      techStack,
      githubUrl: githubUrl.trim() || undefined,
      demoUrl: demoUrl.trim() || undefined,
      content,
      createdAt: new Date().toISOString(),
    };

    // Remove keys with undefined values so Firestore doesn't throw an error
    Object.keys(projectData).forEach((key) => {
      const k = key as keyof typeof projectData;
      if (projectData[k] === undefined) {
        delete projectData[k];
      }
    });

    let success = false;
    if (editingId) {
      success = await updateProject(editingId, projectData);
    } else {
      const resId = await addProject(projectData);
      success = !!resId;
    }

    setIsSubmitting(false);

    if (success) {
      setIsModalOpen(false);
      resetForm();
      fetchProjects();
    } else {
      alert('Failed to save project data.');
    }
  };

  // Delete Handler
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
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition text-sm cursor-pointer">
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
            <div key={project.id} className="bg-bg-card border border-border-main rounded-xl overflow-hidden flex flex-col justify-between hover:border-primary/50 transition">
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
                  <button onClick={() => handleOpenModal(project)} className="p-1.5 hover:bg-bg-main rounded text-text-muted hover:text-primary transition cursor-pointer" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => project.id && handleDelete(project.id)} className="p-1.5 hover:bg-bg-main rounded text-text-muted hover:text-red-500 transition cursor-pointer" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-card border border-border-main rounded-xl max-w-2xl w-full my-8 p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-main p-1 rounded-lg cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-text-main mb-6">{editingId ? 'Edit Project' : 'Add New Project'}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Banner Image Uploader */}
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Project Banner (Optional)</label>
                <ImageUploader value={bannerUrl} onChange={setBannerUrl} />
              </div>

              {/* Multiple Preview Images Bulk Uploader */}
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Project Preview Screenshots / Mockups (Optional, Max 5)</label>
                <MultiImageUploader values={previewImages} onChange={setPreviewImages} maxFiles={5} />
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="E.g., AI Career Toolkit"
                    className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ai-career-toolkit"
                    className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief summary of the project for card preview..."
                  className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                />
              </div>

              {/* Tech Stack Input Tags */}
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Tech Stack (Type & Press Enter)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleAddTech}
                  placeholder="Type technology (e.g. Next.js, Tailwind) and press Enter"
                  className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-bg-main border border-border-main text-primary text-xs rounded-md">
                      {tech}
                      <button type="button" onClick={() => handleRemoveTech(tech)} className="hover:text-red-500 cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">GitHub URL (Optional)</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-bg-main border border-border-main rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              {/* Rich Text Editor Content */}
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Full Project Content / Case Study</label>
                <TipTapEditor value={content} onChange={setContent} />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border-main">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-bg-main hover:bg-border-main/50 text-text-muted hover:text-text-main rounded-lg text-sm font-medium transition cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition disabled:opacity-50 cursor-pointer">
                  {isSubmitting ? 'Saving...' : editingId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
