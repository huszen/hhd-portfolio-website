'use client';

import Image from 'next/image';
import { ArrowDown, FileText, Cat, LinkIcon, Mail } from 'lucide-react';
import { Profile } from '@/types/portfolio';

interface HeroSectionProps {
  profile: Profile | null;
}

// Hero section component displaying avatar, title, short intro, CTAs, and social links
export default function HeroSection({ profile }: HeroSectionProps) {
  if (!profile) return null;

  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] py-20 md:py-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
      {/* Left Column: Text & Content */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-tight">{profile.fullName}</h1>
          <p className="text-xl md:text-2xl font-medium text-text-muted max-w-2xl">{profile.headline}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-text font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          )}

          <a href="#projects" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bg-card border border-border-main hover:border-primary/50 text-text-main font-semibold text-sm transition-all shadow-sm">
            <span>View My Work</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Social Media Links */}
        {profile.socialLinks && (
          <div className="flex items-center gap-4 pt-2">
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-bg-card border border-border-main text-text-muted hover:text-text-main hover:border-primary/50 transition-all shadow-sm"
                title="GitHub Profile"
              >
                <Cat className="w-5 h-5" />
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-bg-card border border-border-main text-text-muted hover:text-text-main hover:border-primary/50 transition-all shadow-sm"
                title="LinkedIn Profile"
              >
                <LinkIcon className="w-5 h-5" />
              </a>
            )}
            {profile.socialLinks.email && (
              <a href={`mailto:${profile.socialLinks.email}`} className="p-3 rounded-xl bg-bg-card border border-border-main text-text-muted hover:text-text-main hover:border-primary/50 transition-all shadow-sm" title="Send Email">
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Taller Portrait Framed Photo */}
      <div className="relative shrink-0 w-72 sm:w-80 lg:w-96 aspect-[3/4]">
        {/* Subtle Decorative Frame Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-border-main bg-bg-card p-2.5 shadow-2xl hover:border-primary/40 transition-colors duration-300">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-bg-main border border-border-main">
            {profile.avatarUrl ? (
              <Image src={profile.avatarUrl} alt={profile.fullName} fill priority sizes="(max-width: 768px) 320px, 384px" className="object-cover object-center" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-5xl font-bold">{profile.fullName?.charAt(0) || 'P'}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
