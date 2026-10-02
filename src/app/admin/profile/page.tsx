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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-text-muted">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Profile & Skills</h1>
          <p className="text-sm text-text-muted mt-1">Manage your personal identity, bio, categorized skills, and education</p>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-primary-text font-medium rounded-lg transition disabled:opacity-50 cursor-pointer">
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

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <BasicInfoSection profile={profile} onChange={(updatedProfile) => setProfile(updatedProfile)} />

        <SkillsSection skills={profile.skills} onChange={(updatedSkills) => setProfile({ ...profile, skills: updatedSkills })} />

        <EducationSection education={profile.education} onChange={(updatedEducation) => setProfile({ ...profile, education: updatedEducation })} />

        <SocialLinksSection socialLinks={profile.socialLinks} onChange={(updatedLinks) => setProfile({ ...profile, socialLinks: updatedLinks })} />
      </form>
    </div>
  );
}
