'use client';

import { useEffect, useState } from 'react';
import { getCertificates, addCertificate, deleteCertificate } from '@/lib/firestore';
import { Certificate } from '@/types/portfolio';
import ImageUploader from '@/components/admin/ImageUploader';
import { Plus, Trash2, Loader2, Award, ExternalLink, Calendar, Building, X } from 'lucide-react';
import Image from 'next/image';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<Certificate, 'id' | 'createdAt'>>({
    title: '',
    issuer: '',
    issueDate: '',
    bannerUrl: '',
    credentialUrl: '',
  });

  const fetchCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await addCertificate({
        ...formData,
        createdAt: new Date().toISOString(),
      });

      // Reset form
      setFormData({
        title: '',
        issuer: '',
        issueDate: '',
        bannerUrl: '',
        credentialUrl: '',
      });
      setShowForm(false);
      fetchCertificates(); // Refresh List
    } catch (error) {
      console.error('Failed to add certificate:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    try {
      await deleteCertificate(id);
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));
    } catch (error) {
      console.error('Failed to delete certificate:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-text-muted">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Certificates</h1>
          <p className="text-sm text-text-muted mt-1">Manage your professional certifications and achievements</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition text-sm cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Add Certificate</span>
          </button>
        )}
      </div>

      {/* Modal / Create Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6 relative animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-border-main pb-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-text-main">
              <Award className="w-5 h-5 text-primary" />
              <h2>New Certificate</h2>
            </div>
            <button type="button" onClick={() => setShowForm(false)} className="text-text-muted hover:text-text-main transition cursor-pointer">
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
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-bg-main hover:bg-border-main/50 text-text-main font-medium rounded-lg transition text-sm cursor-pointer">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !formData.bannerUrl}
              className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition disabled:opacity-50 text-sm cursor-pointer"
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
      )}

      {/* Certificates List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.length === 0 ? (
          <div className="col-span-full bg-bg-card border border-border-main rounded-xl p-12 text-center text-text-muted">
            <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No certificates added yet.</p>
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert.id} className="bg-bg-card border border-border-main rounded-xl overflow-hidden flex flex-col justify-between group hover:border-border-main/80 transition">
              <div className="p-5 space-y-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border-main bg-bg-main">
                  <Image src={cert.bannerUrl} alt={cert.title} fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-text-main text-lg leading-snug">{cert.title}</h3>
                  <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-primary" />
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-text-muted" />
                      {cert.issueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-bg-main border-t border-border-main flex items-center justify-between text-xs">
                {cert.credentialUrl ? (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 font-medium">
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-text-muted">No URL provided</span>
                )}

                <button onClick={() => cert.id && handleDelete(cert.id)} className="text-text-muted hover:text-red-500 p-1 transition cursor-pointer" title="Delete certificate">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
