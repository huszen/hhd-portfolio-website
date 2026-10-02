'use client';

import { Cat, LinkIcon, Mail } from 'lucide-react';

interface FooterProps {
  fullName?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

// Reusable layout footer displaying copyrigh notice and socila links
export default function Footer({ fullName = 'Portfolio', socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-main bg-bg-card transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Copyright */}
        <p className="text-xs text-text-muted text-center md:text-left leading-relaxed">
          © {currentYear} <span className="font-semibold text-text-main">{fullName}</span>. All rights reserved.
        </p>

        {/* Right Side: Social Media Links */}
        {socialLinks && (
          <div className="flex items-center gap-3">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main border border-transparent hover:border-border-main transition-all"
                title="GitHub Profile"
              >
                <Cat className="w-4 h-4" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main border border-transparent hover:border-border-main transition-all"
                title="LinkedIn Profile"
              >
                <LinkIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks.email && (
              <a href={`mailto:${socialLinks.email}`} className="p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main border border-transparent hover:border-border-main transition-all" title="Send Email">
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
