'use client';

import { useState } from 'react';
import { Certificate } from '@/types/portfolio';
import ImageUploader from '@/components/admin/ImageUploader';
import { Award, Loader2, X } from 'lucide-react';

interface CertificateFormModalProps {
  onClose: () => void;
  onSubmitSuccess: () => void;
  addCertificateFn: (cert: Omit<Certificate, 'id'>) => Promise<string | null>;
}

export default function CertificateFormModal({ onClose, onSubmitSuccess, addCertificateFn }: CertificateFormModalProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Omit<Certificate, 'id' | 'createdAt'>>({
    title: '',
    issuer: '',
    issueDate: '',
    bannerUrl: '',
    credentialUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await addCertificateFn({
        ...formData,
        createdAt: new Date().toISOString(),
      });

      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to add certificate:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6 relative animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-border-main pb-3">
        <div className="flex items-center gap-2 text-lg font-semibold text-text-main">
          <Award className="w-5 h-5 text-primary" />
          <h2>New Certificate</h2>
        </div>
        <button type="button" onClick={onClose} className="text-text-muted hover:text-text-main transition cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-text-main mb-2">Certificate Image / Banner</label>
          <ImageUploader value={formData.bannerUrl} onChange={(url) => setFormData({ ...formData, bannerUrl: url })} onRemove={() => setFormData({ ...formData, bannerUrl: '' })} />
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Certificate Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. TensorFlow Developer Certificate"
              className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Issuing Organization</label>
            <input
              type="text"
              required
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              placeholder="e.g. Google / Amazon Web Services"
              className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Issue Date</label>
              <input
                type="text"
                required
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                placeholder="e.g. March 2024"
                className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Credential URL</label>
              <input
                type="url"
                value={formData.credentialUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credentialUrl: e.target.value,
                  })
                }
                placeholder="https://coursera.org/verify/..."
                className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border-main">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-bg-main hover:bg-border-main/50 text-text-main font-medium rounded-lg transition text-sm cursor-pointer">
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !formData.bannerUrl}
          className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-hover text-primary-text font-medium rounded-lg transition disabled:opacity-50 text-sm cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Certificate</span>
          )}
        </button>
      </div>
    </form>
  );
}
