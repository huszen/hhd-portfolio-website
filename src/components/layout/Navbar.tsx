'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
];

interface NavbarProps {
  fullName?: string;
  resumeUrl?: string;
}

// Sticky Navbar with Active section indicator via IntersectionObserver
export default function Navbar({ fullName = 'Portfolio', resumeUrl }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  //   Active section observer setup
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  //   Smooth scroll handler

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-main/80 backdrop-blur-md border-b border-border-main transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            scrollToSection('#');
          }}
          className="text-lg font-bold tracking-tight text-text-main hover:text-primary transition-colors"
        >
          HHD
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    scrollToSection(item.href);
                  }}
                  className={`text-sm font-medium transition-colors relative py-1 ${isActive ? 'text-text-main font-semibold' : 'text-text-muted hover:text-text-main'}`}
                >
                  {item.label}
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300" />}
                </a>
              );
            })}
          </div>

          {/* Action Button */}
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-semibold rounded-xl bg-primary hover:bg-primary-hover text-primary-text transition-all duration-200 shadow-sm">
              Resume
            </a>
          )}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-card border border-border-main transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border-main bg-bg-card px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    scrollToSection(item.href);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-bg-main text-text-main font-semibold' : 'text-text-muted hover:text-text-main hover:bg-bg-main'}`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {resumeUrl && (
            <div className="pt-2 border-t border-border-main">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-2.5 text-xs font-semibold rounded-xl bg-primary hover:bg-primary-hover text-primary-text transition-all duration-200">
                View Resume
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
