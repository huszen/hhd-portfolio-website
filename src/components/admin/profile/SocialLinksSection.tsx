'use client';

import { Profile } from '@/types/portfolio';
import { User } from 'lucide-react';

interface SocialLinksSectionProps {
  socialLinks: Profile['socialLinks'];
  onChange: (updatedLinks: Profile['socialLinks']) => void;
}

export default function SocialLinksSection({ socialLinks, onChange }: SocialLinksSectionProps) {
  return (
    <section className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2 text-lg font-semibold text-text-main border-b border-border-main pb-3">
        <User className="w-5 h-5 text-primary" />
        <h2>Social Links</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">GitHub URL</label>
          <input
            type="url"
            value={socialLinks.github}
            onChange={(e) => onChange({ ...socialLinks, github: e.target.value })}
            placeholder="https://github.com/username"
            className="w-full px-3 py-1.5 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">LinkedIn URL</label>
          <input
            type="url"
            value={socialLinks.linkedin}
            onChange={(e) => onChange({ ...socialLinks, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3 py-1.5 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">Email Address</label>
          <input
            type="email"
            value={socialLinks.email}
            onChange={(e) => onChange({ ...socialLinks, email: e.target.value })}
            placeholder="name@example.com"
            className="w-full px-3 py-1.5 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
          />
        </div>
      </div>
    </section>
  );
}
