'use client';

import { useState } from 'react';
import { Profile } from '@/types/portfolio';
import { Wrench, Plus, Trash2 } from 'lucide-react';

interface SkillsSectionProps {
  skills: Profile['skills'];
  onChange: (updatedSkills: Profile['skills']) => void;
}

export default function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const addCategory = () => {
    if (!newCategory.trim()) return;
    const catName = newCategory.trim();

    if (!skills[catName]) {
      onChange({ ...skills, [catName]: [] });
      setSelectedCategory(catName);
    }
    setNewCategory('');
  };

  const removeCategory = (category: string) => {
    const updatedSkills = { ...skills };
    delete updatedSkills[category];
    onChange(updatedSkills);
  };

  const addSkillToCategory = (category: string) => {
    if (!newSkill.trim() || !category) return;

    const currentSkills = skills[category] || [];
    if (!currentSkills.includes(newSkill.trim())) {
      onChange({
        ...skills,
        [category]: [...currentSkills, newSkill.trim()],
      });
    }
    setNewSkill('');
  };

  const removeSkillFromCategory = (category: string, skillToRemove: string) => {
    onChange({
      ...skills,
      [category]: skills[category].filter((s) => s !== skillToRemove),
    });
  };

  return (
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
        {Object.keys(skills).length === 0 ? (
          <p className="text-sm text-text-muted italic">No skill categories added yet.</p>
        ) : (
          Object.entries(skills).map(([category, items]) => (
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
  );
}
