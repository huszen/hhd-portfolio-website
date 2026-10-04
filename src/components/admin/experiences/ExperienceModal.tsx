'use client';

import { useState, useEffect } from 'react';
import { Experience } from '@/types/portfolio';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Experience, 'id'>, id?: string) => Promise<void>;
  initialData?: Experience | null;
}

export default function ExperienceModal({ isOpen, onClose, onSave, initialData }: ExperienceModalProps) {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrentRole, setIsCurrentRole] = useState(false);
  const [description, setDescription] = useState<string[]>(['']);
  const [skillsInput, setSkillsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setRole(initialData.role || '');
      setCompany(initialData.company || '');
      setLocation(initialData.location || '');
      setStartDate(initialData.startDate || '');
      setEndDate(initialData.endDate || '');
      setIsCurrentRole(initialData.isCurrentRole || false);
      setDescription(initialData.description?.length ? initialData.description : ['']);
      setSkillsInput(initialData.skills?.join(', ') || '');
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setRole('');
    setCompany('');
    setLocation('');
    setStartDate('');
    setEndDate('');
    setIsCurrentRole(false);
    setDescription(['']);
    setSkillsInput('');
  };

  if (!isOpen) return null;

  // Bullet points helpers
  const handleBulletChange = (index: number, value: string) => {
    const updated = [...description];
    updated[index] = value;
    setDescription(updated);
  };

  const addBullet = () => setDescription([...description, '']);

  const removeBullet = (index: number) => {
    if (description.length === 1) return;
    setDescription(description.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !company || !startDate) return;

    setIsSubmitting(true);
    try {
      const parsedSkills = skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const cleanedBullets = description.map((d) => d.trim()).filter(Boolean);

      await onSave(
        {
          role,
          company,
          location,
          startDate,
          endDate: isCurrentRole ? 'Present' : endDate,
          isCurrentRole,
          description: cleanedBullets,
          skills: parsedSkills,
        },
        initialData?.id,
      );
      onClose();
    } catch (error) {
      console.error('Failed to save experience:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-bg-card border border-border-main rounded-xl w-full max-w-2xl my-8 overflow-hidden shadow-xl space-y-6 p-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border-main pb-4">
          <h2 className="text-xl font-bold text-text-main">{initialData ? 'Edit Work Experience' : 'Add Work Experience'}</h2>
          <button onClick={onClose} className="p-1 text-text-muted hover:text-text-main transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Role / Job Title *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Research Assistant"
                className="w-full px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-main focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Company / Organization *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Sriwijaya University"
                className="w-full px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-main focus:border-primary outline-none"
              />
            </div>
          </div>

          {/* Location & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Palembang, Indonesia"
                className="w-full px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-main focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Start Date *</label>
              <input
                type="text"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="e.g. Aug 2024"
                className="w-full px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-main focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">End Date</label>
              <input
                type="text"
                disabled={isCurrentRole}
                value={isCurrentRole ? 'Present' : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="e.g. Aug 2025"
                className="w-full px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-main focus:border-primary outline-none disabled:opacity-50"
              />
            </div>
          </div>

          {/* Current Role Checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isCurrentRole" checked={isCurrentRole} onChange={(e) => setIsCurrentRole(e.target.checked)} className="rounded border-border-main accent-primary h-4 w-4" />
            <label htmlFor="isCurrentRole" className="text-xs text-text-muted cursor-pointer">
              I currently work here
            </label>
          </div>

          {/* Bullet Points Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-text-muted">Responsibilities & Key Achievements</label>
              <button type="button" onClick={addBullet} className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
                <Plus className="w-3 h-3" /> Add Bullet
              </button>
            </div>
            {description.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleBulletChange(idx, e.target.value)}
                  placeholder={`Bullet point ${idx + 1}`}
                  className="flex-1 px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-main focus:border-primary outline-none"
                />
                {description.length > 1 && (
                  <button type="button" onClick={() => removeBullet(idx)} className="p-2 text-text-muted hover:text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Tech Stack Badges */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Skills / Tech Stack (comma separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. Python, Llama-3, BERTopic, AWS"
              className="w-full px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-main focus:border-primary outline-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border-main">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-text-muted hover:text-text-main transition">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-primary text-primary-text rounded-lg text-sm font-semibold hover:opacity-90 transition flex items-center gap-2">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {initialData ? 'Update Experience' : 'Create Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
