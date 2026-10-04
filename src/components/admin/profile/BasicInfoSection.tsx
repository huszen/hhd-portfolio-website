'use client';

import { Profile } from '@/types/portfolio';
import ImageUploader from '@/components/admin/ImageUploader';
import { User } from 'lucide-react';

interface BasicInfoSectionProps {
  profile: Profile;
  onChange: (updatedProfile: Profile) => void;
}

export default function BasicInfoSection({ profile, onChange }: BasicInfoSectionProps) {
  return (
    <section className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-lg font-semibold text-text-main border-b border-border-main pb-3">
        <User className="w-5 h-5 text-primary" />
        <h2>Basic Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Centered & Enlarged Avatar Upload Box */}
        <div className="flex flex-col items-center justify-center w-full h-full pb-4">
          {/* <label className="text-sm font-medium text-text-muted self-start md:self-center mb-2">Profile Avatar</label> */}

          {/* Bigger container (w-56 h-56 / 224px) centered with mt-4 for slight downward shift */}
          <div className="w-56 h-56 mt-4 shrink-0">
            <ImageUploader value={profile.avatarUrl} onChange={(url) => onChange({ ...profile, avatarUrl: url })} />
          </div>
        </div>

        {/* Right Column: Text Inputs */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Full Name</label>
            <input
              type="text"
              required
              value={profile.fullName}
              onChange={(e) => onChange({ ...profile, fullName: e.target.value })}
              placeholder="e.g. Hasbi Hussein Deri"
              className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Headline / Title</label>
            <input
              type="text"
              required
              value={profile.headline}
              onChange={(e) => onChange({ ...profile, headline: e.target.value })}
              placeholder="e.g. AI Engineer & Full Stack Developer"
              className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Short Bio</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => onChange({ ...profile, bio: e.target.value })}
              placeholder="A concise summary of your professional profile..."
              className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Resume / CV URL</label>
            <input
              type="url"
              value={profile.resumeUrl}
              onChange={(e) => onChange({ ...profile, resumeUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
