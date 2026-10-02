'use client';

import { useEffect, useState } from 'react';
import { getCertificates, addCertificate, deleteCertificate } from '@/lib/firestore';
import { Certificate } from '@/types/portfolio';
import CertificateFormModal from '@/components/admin/certificates/CertificateFormModal';
import CertificateCard from '@/components/admin/certificates/CertificateCard';
import { Plus, Loader2, Award } from 'lucide-react';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-primary-text font-medium rounded-lg transition text-sm cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Add Certificate</span>
          </button>
        )}
      </div>

      {/* Modal / Create Form */}
      {showForm && <CertificateFormModal onClose={() => setShowForm(false)} onSubmitSuccess={fetchCertificates} addCertificateFn={addCertificate} />}

      {/* Certificates List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.length === 0 ? (
          <div className="col-span-full bg-bg-card border border-border-main rounded-xl p-12 text-center text-text-muted">
            <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No certificates added yet.</p>
          </div>
        ) : (
          certificates.map((cert) => <CertificateCard key={cert.id} certificate={cert} onDelete={handleDelete} />)
        )}
      </div>
    </div>
  );
}
