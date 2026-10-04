'use client';

import { useEffect, useState } from 'react';
import { Experience } from '@/types/portfolio';
import { getExperiences } from '@/lib/firestore';
import TechBadge from '@/components/ui/TechBadge';
import { Calendar, MapPin, Building2, Loader2, BriefcaseBusiness } from 'lucide-react';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await getExperiences();
      setExperiences(data);
      setIsLoading(false);
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return (
      <section id="experiences" className="pt-8 py-40 border-t border-border-main">
        <div className="max-w-4xl mx-auto flex items-center justify-center text-text-muted gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Loading experience history...</span>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) return null;

  return (
    <section id="experiences" className="pt-8 py-40 border-t border-border-main">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-1">
            <BriefcaseBusiness className="w-3.5 h-3.5" />
            <span>Experiences</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">Work Experience</h2>
          <p className="text-sm text-text-muted">Professional trajectory, research assistantships, and industry involvement</p>
        </div>

        {/* Experience List */}
        <div className="space-y-6">
          {experiences.map((exp) => {
            const dateDisplay = exp.startDate ? `${exp.startDate} - ${exp.isCurrentRole ? 'Present' : exp.endDate || 'Present'}` : (exp as unknown as { period?: string }).period || '';

            return (
              <div key={exp.id} className="bg-bg-card border border-border-main p-6 rounded-2xl shadow-sm space-y-4 hover:border-primary/40 transition">
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-border-main pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-text-main">{exp.role}</h3>
                      {exp.isCurrentRole && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Current</span>}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted mt-1">
                      <span className="flex items-center gap-1 font-medium text-text-main">
                        <Building2 className="w-3.5 h-3.5 text-primary" />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      )}
                      {dateDisplay && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {dateDisplay}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bullet Points */}
                {exp.description && exp.description.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-text-muted space-y-1.5 pl-1 leading-relaxed">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx}>
                        <span className="-ml-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Badges */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border-main">
                    {exp.skills.map((skill, idx) => (
                      <TechBadge key={idx} name={skill} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
