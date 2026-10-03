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
    <div className="group bg-bg-card border border-border-main rounded-xl overflow-hidden flex flex-col justify-between hover:border-border-main/80 transition-all duration-200 shadow-sm hover:shadow-md">
      <div>
        {/* Banner Container with fixed aspect ratio */}
        <div className="relative w-full aspect-[16/9] bg-white/5 border-b border-border-main/50 overflow-hidden">
          <Image src={certificate.bannerUrl} alt={certificate.title} fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
          {/* Top-right floating delete action */}
          <button
            onClick={() => certificate.id && onDelete(certificate.id)}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-bg-main/80 text-text-muted hover:text-red-400 hover:bg-red-500/10 border border-border-main/40 transition-colors backdrop-blur-sm cursor-pointer"
            title="Delete certificate"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-text-main text-base leading-snug line-clamp-2">{certificate.title}</h3>

          <div className="flex flex-col gap-1.5 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{certificate.issuer}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span>{certificate.issueDate}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="px-4 py-3 bg-bg-main/40 border-t border-border-main flex items-center justify-between text-xs">
        {certificate.credentialUrl ? (
          <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 flex items-center gap-1.5 font-medium transition-colors">
            <span>Verify Credential</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-text-muted/60 italic">No URL provided</span>
        )}
      </div>
    </div>
  );
}
