// src/components/admin/projects/ProjectModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/portfolio';
import ImageUploader from '@/components/admin/ImageUploader';
import MultiImageUploader from '@/components/admin/MultiImageUploader';
import TipTapEditor from '@/components/admin/TipTapEditor';
import { X } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  editingProject: Project | null;
  onClose: () => void;
  onSubmitSuccess: () => void;
  // Change boolean to null here:
  addProjectFn: (project: Omit<Project, 'id'>) => Promise<string | null>;
  updateProjectFn: (id: string, project: Partial<Project>) => Promise<boolean>;
}

export default function ProjectModal({ isOpen, editingProject, onClose, onSubmitSuccess, addProjectFn, updateProjectFn }: ProjectModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setSlug(editingProject.slug);
      setShortDescription(editingProject.shortDescription);
      setBannerUrl(editingProject.bannerUrl || '');
      setPreviewImages(editingProject.previewImages || []);
      setTechStack(editingProject.techStack || []);
      setGithubUrl(editingProject.githubUrl || '');
      setDemoUrl(editingProject.demoUrl || '');
      setContent(editingProject.content || '');
    } else {
      resetForm();
    }
  }, [editingProject, isOpen]);

  const resetForm = () => {
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingProject) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      );
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Identify images removed during editing and delete from Cloudinary CDN
    if (editingProject) {
      const oldImages: string[] = [];
      if (editingProject.bannerUrl) oldImages.push(editingProject.bannerUrl);
      if (Array.isArray(editingProject.previewImages)) oldImages.push(...editingProject.previewImages);

      const newImages: string[] = [];
      if (bannerUrl.trim()) newImages.push(bannerUrl.trim());
      if (Array.isArray(previewImages)) newImages.push(...previewImages);

      // Find any image present in old project but absent in current state
      const removedImages = oldImages.filter((url) => !newImages.includes(url));

      if (removedImages.length > 0) {
        await Promise.all(
          removedImages.map((url) =>
            fetch('/api/cloudinary/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url }),
            }).catch((err) => console.error('Failed to cleanup removed image:', url, err)),
          ),
        );
      }
    }

    // 2. Prepare payload for Firestore
    // IMPORTANT: Set empty fields to null / [] so Firestore actually overwrites & removes them!
    const projectData: Record<string, any> = {
      title,
      slug,
      shortDescription,
      bannerUrl: bannerUrl.trim() ? bannerUrl.trim() : null,
      previewImages: previewImages.length > 0 ? previewImages : [],
      techStack,
      githubUrl: githubUrl.trim() ? githubUrl.trim() : null,
      demoUrl: demoUrl.trim() ? demoUrl.trim() : null,
      content,
      createdAt: editingProject?.createdAt || new Date().toISOString(),
    };

    // 3. Save to Firestore
    let success = false;
    if (editingProject?.id) {
      success = await updateProjectFn(editingProject.id, projectData);
    } else {
      const resId = await addProjectFn(projectData as Omit<Project, 'id'>);
      success = !!resId;
    }

    setIsSubmitting(false);

    if (success) {
      onClose();
      resetForm();
      onSubmitSuccess();
    } else {
      alert('Failed to save project data.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-bg-card border border-border-main rounded-xl max-w-2xl w-full my-8 p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-text-main p-1 rounded-lg cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-text-main mb-6">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>

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
            <button type="button" onClick={onClose} className="px-4 py-2 bg-bg-main hover:bg-border-main/50 text-text-muted hover:text-text-main rounded-lg text-sm font-medium transition cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-text rounded-lg text-sm font-medium transition disabled:opacity-50 cursor-pointer">
              {isSubmitting ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
