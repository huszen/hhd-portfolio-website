'use client';

import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '@/lib/firestore';
import { Profile } from '@/types/portfolio';
import { Save, Loader2, CheckCircle } from 'lucide-react';

// Modularized section components
import BasicInfoSection from '@/components/admin/profile/BasicInfoSection';
import SkillsSection from '@/components/admin/profile/SkillsSection';
import EducationSection from '@/components/admin/profile/EducationSection';
import SocialLinksSection from '@/components/admin/profile/SocialLinksSection';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    fullName: '',
    headline: '',
    bio: '',
    avatarUrl: '',
    resumeUrl: '',
    socialLinks: { github: '', linkedin: '', email: '' },
    skills: {},
    education: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const data = await getProfile();
        if (data) {
          setProfile({
            ...data,
            skills: data.skills || {},
            education: data.education || [],
            socialLinks: data.socialLinks || { github: '', linkedin: '', email: '' },
          });
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfileData();
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    try {
      await updateProfile(profile);
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar - Standardized to match Experience page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-main pb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">Profile & Skills</h1>
          <p className="text-sm text-text-muted mt-0.5">Manage your personal identity, bio, categorized skills, and education.</p>
        </div>
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={saving || loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-text rounded-lg text-sm font-semibold hover:opacity-90 transition shrink-0 self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 p-4 rounded-xl flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-text-muted gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Loading profile details...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection profile={profile} onChange={(updatedProfile) => setProfile(updatedProfile)} />

          <SkillsSection skills={profile.skills} onChange={(updatedSkills) => setProfile({ ...profile, skills: updatedSkills })} />

          <EducationSection education={profile.education} onChange={(updatedEducation) => setProfile({ ...profile, education: updatedEducation })} />

          <SocialLinksSection socialLinks={profile.socialLinks} onChange={(updatedLinks) => setProfile({ ...profile, socialLinks: updatedLinks })} />
        </form>
      )}
    </div>
  );
}
