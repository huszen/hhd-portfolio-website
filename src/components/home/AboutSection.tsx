'use client';

import { GraduationCap, User, FileUser } from 'lucide-react';
import { Profile } from '@/types/portfolio';

interface AboutSectionProps {
  profile: Profile | null;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  if (!profile) return null;

  return (
    <section id="about" className="pt-8 py-20 border-t border-border-main">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-1">
            <FileUser className="w-3.5 h-3.5" />
            <span>PROFILE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">About Me</h2>
          <p className="text-sm text-text-muted">Background, personal story, and educational background</p>
        </div>

        {/* Biography */}
        {profile.bio && (
          <div className="bg-bg-card border border-border-main p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <User className="w-4 h-4" />
              <span>Biography</span>
            </div>
            <p className="text-text-main leading-relaxed text-sm md:text-base whitespace-pre-line">{profile.bio}</p>
          </div>
        )}

        {/* Education Timeline */}
        {profile.education && profile.education.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-text-main font-bold text-lg">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3>Education History</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {profile.education.map((edu, index) => (
                <div key={index} className="bg-bg-card border border-border-main p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{edu.period}</span>
                    <h4 className="text-base font-bold text-text-main">{edu.degree}</h4>
                    <p className="text-sm text-text-muted">{edu.institution}</p>
                  </div>

                  {edu.gpa && (
                    <div className="pt-3 border-t border-border-main flex items-center justify-between text-xs">
                      <span className="text-text-muted">GPA / Score</span>
                      <span className="font-semibold text-text-main bg-bg-main px-2.5 py-1 rounded-md border border-border-main">{edu.gpa}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
