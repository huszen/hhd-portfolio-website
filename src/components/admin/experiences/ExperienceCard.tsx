'use client';

import { Experience } from '@/types/portfolio';
import { Pencil, Trash2, Calendar, MapPin, Building2 } from 'lucide-react';
import TechBadge from '@/components/ui/TechBadge';

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (id: string) => void;
}

export default function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
  return (
    <div className="bg-bg-card border border-border-main rounded-xl p-5 space-y-4 hover:border-primary/40 transition">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-text-main">{experience.role}</h3>
            {experience.isCurrentRole && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Current</span>}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted mt-1">
            <span className="flex items-center gap-1 font-medium text-text-main">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              {experience.company}
            </span>
            {experience.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {experience.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {experience.startDate} - {experience.isCurrentRole ? 'Present' : experience.endDate}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
          <button onClick={() => onEdit(experience)} className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition" title="Edit Experience">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => experience.id && onDelete(experience.id)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition" title="Delete Experience">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description Bullet Points */}
      {experience.description && experience.description.length > 0 && (
        <ul className="list-disc list-inside text-sm text-text-muted space-y-1 pl-1">
          {experience.description.map((bullet, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="-ml-1">{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Skills Badges */}
      {experience.skills && experience.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-main/50">
          {experience.skills.map((skill, idx) => (
            <TechBadge key={idx} name={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
