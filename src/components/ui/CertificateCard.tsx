'use client';

import Image from 'next/image';
import { ExternalLink, Award } from 'lucide-react';
import { Certificate } from '@/types/portfolio';

interface CertificateCardProps {
  certificate: Certificate;
}

// Reusable card component to showcase professional certifications
export default function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <div className="group flex flex-col bg-bg-card border border-border-main rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {/* Banner / Certificate Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-main">
        {certificate.bannerUrl ? (
          <Image src={certificate.bannerUrl} alt={certificate.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-text-muted text-sm">
            <Award className="w-8 h-8 opacity-40" />
            <span>Certificate Preview</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">{certificate.issuer}</span>

        <h3 className="text-base font-bold text-text-main mt-1 group-hover:text-primary transition-colors line-clamp-2">{certificate.title}</h3>

        <p className="text-xs text-text-muted mt-2">Issued {certificate.issueDate}</p>

        {/* Action Link */}
        {certificate.credentialUrl && (
          <div className="pt-4 border-t border-border-main mt-4">
            <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-main hover:text-primary transition-colors">
              <span>Verify Credential</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
