'use client';

import { useState, useEffect } from 'react';
import { Experience } from '@/types/portfolio';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '@/lib/firestore';
import ExperienceCard from '@/components/admin/experiences/ExperienceCard';
import ExperienceModal from '@/components/admin/experiences/ExperienceModal';
import { Plus, Loader2, Briefcase } from 'lucide-react';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const fetchExperiences = async () => {
    setIsLoading(true);
    const data = await getExperiences();
    setExperiences(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenAdd = () => {
    setSelectedExp(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setSelectedExp(exp);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    const success = await deleteExperience(id);
    if (success) {
      setExperiences((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSave = async (data: Omit<Experience, 'id'>, id?: string) => {
    if (id) {
      await updateExperience(id, data);
    } else {
      await addExperience(data);
    }
    await fetchExperiences();
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-main pb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            Work Experience
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            Manage work history, employment roles, key achievements, and skills used.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-text rounded-lg text-sm font-semibold hover:opacity-90 transition shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-text-muted gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Loading experiences...</span>
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border-main rounded-xl space-y-3">
          <Briefcase className="w-10 h-10 text-text-muted mx-auto opacity-50" />
          <p className="text-text-muted text-sm">No work experience added yet.</p>
          <button
            onClick={handleOpenAdd}
            className="text-xs text-primary hover:underline font-medium"
          >
            + Add your first experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedExp}
      />
    </div>
  );
}