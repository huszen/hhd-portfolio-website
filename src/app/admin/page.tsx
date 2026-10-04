'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { UserCheck, FolderKanban, Award, ArrowRight, Briefcase } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const cards = [
    {
      title: 'Profile & Identity',
      desc: 'Manage personal bio, headline, profile avatar, education history, and technical skills.',
      href: '/admin/profile',
      icon: UserCheck,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      title: 'Work Experience',
      desc: 'Manage employment history, research positions, key achievements, and skills used.',
      href: '/admin/experience',
      icon: Briefcase,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      title: 'Manage Projects',
      desc: 'Create, edit, or delete project case studies, tech stack tags, and rich content.',
      href: '/admin/projects',
      icon: FolderKanban,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      title: 'Certifications',
      desc: 'Upload certification badges, credential details, and direct verification links.',
      href: '/admin/certificates',
      icon: Award,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Welcome Back | ⸜(｡˃ ᵕ ˂ )⸝♡</h1>
        <p className="text-text-muted text-sm mt-1">
          Signed in as: <span className="text-primary font-medium">{user?.email}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="p-6 bg-bg-card border border-border-main rounded-xl hover:border-primary/50 transition group flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-text-main group-hover:text-primary transition">{card.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{card.desc}</p>
              </div>

              <div className="flex items-center text-sm font-medium text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Configure</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
