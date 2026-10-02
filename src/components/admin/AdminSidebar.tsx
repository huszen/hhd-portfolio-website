'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, UserCheck, FolderKanban, Award, LogOut, ExternalLink } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Profile & Skills',
      href: '/admin/profile',
      icon: UserCheck,
    },
    {
      label: 'Projects & Cases',
      href: '/admin/projects',
      icon: FolderKanban,
    },
    {
      label: 'Certifications',
      href: '/admin/certificates',
      icon: Award,
    },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-bg-card border-r border-border-main min-h-screen flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        {/* Admin Header */}
        <div className="px-2">
          <h1 className="text-xl font-bold text-text-main tracking-wide">Admin Panel</h1>
          <p className="text-xs text-text-muted mt-0.5">Portfolio Management</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-primary text-primary-text font-semibold' : 'text-text-muted hover:bg-bg-main hover:text-text-main'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Actions (View Site & Logout) */}
      <div className="space-y-2 border-t border-border-main pt-4">
        <Link href="/" target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm text-text-muted hover:text-text-main transition">
          <ExternalLink className="w-4 h-4" />
          <span>View Live Site</span>
        </Link>

        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition cursor-pointer">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
