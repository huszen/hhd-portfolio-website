'use client';

import { Profile } from '@/types/portfolio';
import { BookOpen, Plus, Trash2 } from 'lucide-react';

interface EducationSectionProps {
  education: Profile['education'];
  onChange: (updatedEducation: Profile['education']) => void;
}

export default function EducationSection({ education, onChange }: EducationSectionProps) {
  const addEducation = () => {
    onChange([...education, { institution: '', degree: '', period: '', gpa: '' }]);
  };

  const updateEducation = (index: number, field: keyof Profile['education'][0], value: string) => {
    const updatedEdu = [...education];
    updatedEdu[index][field] = value;
    onChange(updatedEdu);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-border-main pb-3">
        <div className="flex items-center gap-2 text-lg font-semibold text-text-main">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2>Education History</h2>
        </div>
        <button type="button" onClick={addEducation} className="px-3 py-1.5 bg-bg-main hover:bg-border-main/50 text-primary border border-border-main rounded-lg flex items-center gap-1.5 transition text-xs font-medium cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Entry</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="p-4 bg-bg-main border border-border-main rounded-lg space-y-4 relative">
            <button type="button" onClick={() => removeEducation(index)} className="absolute top-4 right-4 text-text-muted hover:text-red-500 transition cursor-pointer">
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Institution Name</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder="e.g. Universitas Sriwijaya"
                  className="w-full px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Degree / Major</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="e.g. Bachelor of Informatics Engineering"
                  className="w-full px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Period / Year</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => updateEducation(index, 'period', e.target.value)}
                  placeholder="e.g. 2020 - 2024"
                  className="w-full px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  placeholder="e.g. 3.98 / 4.00"
                  className="w-full px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
