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
    setLoading(true);
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

  return (
    <div className="space-y-6">
      {/* Top Bar - Standardized Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-main pb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">Certificates</h1>
          <p className="text-sm text-text-muted mt-0.5">Manage your professional certifications, credentials, and achievements.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-text rounded-lg text-sm font-semibold hover:opacity-90 transition shrink-0 self-start sm:self-auto cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Add Certificate</span>
          </button>
        )}
      </div>

      {/* Modal / Create Form */}
      {showForm && <CertificateFormModal onClose={() => setShowForm(false)} onSubmitSuccess={fetchCertificates} addCertificateFn={addCertificate} />}

      {/* Content Area & States */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-text-muted gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Loading certificates...</span>
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border-main rounded-xl space-y-3">
          <Award className="w-10 h-10 text-text-muted mx-auto opacity-50" />
          <p className="text-text-muted text-sm">No certificates added yet.</p>
          <button onClick={() => setShowForm(true)} className="text-xs text-primary hover:underline font-medium">
            + Add your first certificate
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
