'use client';

import { Certificate } from '@/types/portfolio';
import Image from 'next/image';
import { Building, Calendar, ExternalLink, Trash2 } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  onDelete: (id: string) => void;
}

export default function CertificateCard({ certificate, onDelete }: CertificateCardProps) {
  return (
    <div className="bg-bg-card border border-border-main rounded-xl overflow-hidden flex flex-col justify-between group hover:border-border-main/80 transition">
      <div className="p-5 space-y-4">
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border-main bg-bg-main">
          <Image src={certificate.bannerUrl} alt={certificate.title} fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-text-main text-lg leading-snug">{certificate.title}</h3>
          <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-primary" />
              {certificate.issuer}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-text-muted" />
              {certificate.issueDate}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-bg-main border-t border-border-main flex items-center justify-between text-xs">
        {certificate.credentialUrl ? (
          <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 font-medium">
            <span>Verify Credential</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-text-muted">No URL provided</span>
        )}

        <button onClick={() => certificate.id && onDelete(certificate.id)} className="text-text-muted hover:text-red-500 p-1 transition cursor-pointer" title="Delete certificate">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
