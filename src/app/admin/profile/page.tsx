'use client';

import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '@/lib/firestore';
import { Profile } from '@/types/portfolio';
import ImageUploader from '@/components/admin/ImageUploader';
import { Save, Plus, Trash2, Loader2, CheckCircle, User, BookOpen, Wrench } from 'lucide-react';

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

  // States for skill categorization
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSkill, setNewSkill] = useState('');

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

  // Skill Management helpers
  const addCategory = () => {
    if (!newCategory.trim()) return;
    const catName = newCategory.trim();

    if (!profile.skills[catName]) {
      setProfile({
        ...profile,
        skills: { ...profile.skills, [catName]: [] },
      });
      setSelectedCategory(catName);
    }
    setNewCategory('');
  };

  const removeCategory = (category: string) => {
    const updatedSkills = { ...profile.skills };
    delete updatedSkills[category];
    setProfile({ ...profile, skills: updatedSkills });
  };

  const addSkillToCategory = (category: string) => {
    if (!newSkill.trim() || !category) return;

    const currentSkills = profile.skills[category] || [];
    if (!currentSkills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: {
          ...profile.skills,
          [category]: [...currentSkills, newSkill.trim()],
        },
      });
    }
    setNewSkill('');
  };

  const removeSkillFromCategory = (category: string, skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: {
        ...profile.skills,
        [category]: profile.skills[category].filter((s) => s !== skillToRemove),
      },
    });
  };

  // Education Management Helpers
  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { institution: '', degree: '', period: '', gpa: '' }],
    });
  };

  const updateEducation = (index: number, field: keyof Profile['education'][0], value: string) => {
    const updatedEdu = [...profile.education];
    updatedEdu[index][field] = value;
    setProfile({
      ...profile,
      education: updatedEdu,
    });
  };

  const removeEducation = (index: number) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, i) => i !== index),
    });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Profile & Skills</h1>
          <p className="text-sm text-text-muted mt-1">Manage your personal identity, bio, categorized skills, and education</p>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition disabled:opacity-50 cursor-pointer">
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

      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 p-4 rounded-xl flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Profile Information */}
        <section className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-text-main border-b border-border-main pb-3">
            <User className="w-5 h-5 text-primary" />
            <h2>Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-text-main mb-2">Profile Avatar</label>
              <ImageUploader value={profile.avatarUrl} onChange={(url) => setProfile({ ...profile, avatarUrl: url })} folder="portfolio/profile" />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  placeholder="e.g. Hasbi Hussein Deri"
                  className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Headline / Title</label>
                <input
                  type="text"
                  required
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  placeholder="e.g. AI Engineer & Full Stack Developer"
                  className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Short Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="A concise summary of your professional profile..."
                  className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Resume / CV URL</label>
                <input
                  type="url"
                  value={profile.resumeUrl}
                  onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categorized Skills */}
        <section className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-text-main border-b border-border-main pb-3">
            <Wrench className="w-5 h-5 text-primary" />
            <h2>Technical Skills (Categorized)</h2>
          </div>

          {/* Add New Category */}
          <div className="flex gap-3">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category Name (e.g., Languages, Frameworks, Cloud)"
              className="flex-1 px-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
            />
            <button type="button" onClick={addCategory} className="px-4 py-2 bg-bg-main hover:bg-border-main/50 border border-border-main text-text-main rounded-lg flex items-center gap-1.5 transition text-sm font-medium cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Skill Items grouped by Category */}
          <div className="space-y-4 pt-2">
            {Object.keys(profile.skills).length === 0 ? (
              <p className="text-sm text-text-muted italic">No skill categories added yet.</p>
            ) : (
              Object.entries(profile.skills).map(([category, items]) => (
                <div key={category} className="p-4 bg-bg-main border border-border-main rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-primary text-sm">{category}</h3>
                    <button type="button" onClick={() => removeCategory(category)} className="text-text-muted hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Add skill to ${category}...`}
                      value={selectedCategory === category ? newSkill : ''}
                      onChange={(e) => {
                        setSelectedCategory(category);
                        setNewSkill(e.target.value);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillToCategory(category))}
                      className="flex-1 px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                    />
                    <button type="button" onClick={() => addSkillToCategory(category)} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-medium hover:bg-primary/20 transition cursor-pointer">
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {items.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-bg-card border border-border-main text-text-main rounded-md text-xs flex items-center gap-1.5">
                        <span>{skill}</span>
                        <button type="button" onClick={() => removeSkillFromCategory(category, skill)} className="text-text-muted hover:text-red-500 transition cursor-pointer">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Education History */}
        <section className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border-main pb-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-text-main">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2>Education History</h2>
            </div>
            <button type="button" onClick={addEducation} className="px-3 py-1.5 bg-bg-main hover:bg-border-main/50 text-primary border border-border-main rounded-lg flex items-center gap-1.5 transition text-xs font-medium cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Entry</span>
            </button>
          </div>

          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <div key={index} className="p-4 bg-bg-main border border-border-main rounded-lg space-y-4 relative">
                <button type="button" onClick={() => removeEducation(index)} className="absolute top-4 right-4 text-text-muted hover:text-red-500 transition cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Institution Name</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="e.g. Universitas Sriwijaya"
                      className="w-full px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Degree / Major</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="e.g. Bachelor of Informatics Engineering"
                      className="w-full px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Period / Year</label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => updateEducation(index, 'period', e.target.value)}
                      placeholder="e.g. 2020 - 2024"
                      className="w-full px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">GPA (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                      placeholder="e.g. 3.98 / 4.00"
                      className="w-full px-3 py-1.5 bg-bg-card border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-bg-card border border-border-main rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-text-main border-b border-border-main pb-3">
            <User className="w-5 h-5 text-primary" />
            <h2>Social Links</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">GitHub URL</label>
              <input
                type="url"
                value={profile.socialLinks.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, github: e.target.value },
                  })
                }
                placeholder="https://github.com/username"
                className="w-full px-3 py-1.5 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={profile.socialLinks.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-1.5 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Email Address</label>
              <input
                type="email"
                value={profile.socialLinks.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, email: e.target.value },
                  })
                }
                placeholder="name@example.com"
                className="w-full px-3 py-1.5 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-primary transition"
              />
            </div>
          </div>
        </section>

        {/* Bottom Action Bar
        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition disabled:opacity-50 cursor-pointer">
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div> */}
      </form>
    </div>
  );
}
