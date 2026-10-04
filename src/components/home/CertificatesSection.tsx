'use client';

import { Award } from 'lucide-react';
import { Certificate } from '@/types/portfolio';
import CertificateCard from '../ui/CertificateCard';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

// Certificates section displaying professional achievements and verifications

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="pt-8 py-16 border-t border-border-main">
      <div className="max-w-6xl mx-auto space-y-8 ">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>CERTIFICATES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">Certifications & Licenses</h2>
          <p className="text-sm text-text-muted max-w-xl mx-auto">Verified accomplishments, course completions, and official certifications</p>
        </div>

        {/* Certificates Grid */}
        <div className="flex flex-wrap justify-center gap-6 mt-15">
          {certificates.map((cert) => (
            <div key={cert.id || cert.title} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <CertificateCard certificate={cert} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
