'use client';

import { Code2 } from 'lucide-react';
import TechBadge from '../ui/TechBadge';

interface SkillsSectionProps {
  skills?: {
    [category: string]: string[];
  };
}

// Skills section displaying skills categorized into grouped cards
export default function SkillsSection({ skills }: SkillsSectionProps) {
  if (!skills || Object.keys(skills).length === 0) return null;

  return (
    <section id="skills" className="pt-8 py-36 border-t border-border-main">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">Skills & Expertise</h2>
          <p className="text-sm text-text-muted">Technologies, tools, and technical domain proficiency</p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-bg-card border border-border-main p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-text-main font-bold text-base capitalize border-b border-border-main pb-3">
                <Code2 className="w-4 h-4 text-primary" />
                <h3>{category}</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {items.map((skill) => (
                  <TechBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
