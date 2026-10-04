// Interface untuk Profil & Identitas
export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
}

export interface Profile {
  fullName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  education: Education[];
  skills: {
    [category: string]: string[];
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

// Interface for Portfolio Projects
export interface Project {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  bannerUrl?: string;
  previewImages?: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  content: string;
  createdAt: string;
}

// Interface for Certificates
export interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  bannerUrl: string;
  credentialUrl: string;
  createdAt: string;
}

// Interface for Experience
export interface Experience {
  id?: string;
  role: string; // e.g., "Research Assistant"
  company: string; // e.g., "Sriwijaya University"
  location?: string; // e.g., "Palembang, Indonesia" (Optional)
  startDate: string; // e.g., "Aug 2024"
  endDate: string; // e.g., "Present" or "Aug 2025"
  isCurrentRole?: boolean;
  description: string[]; // Bullet points describing responsibilities/achievements
  skills?: string[]; // Tech stack used (e.g., ["Python", "Llama-3", "BERTopic"])
  order?: number; // For custom sorting
  createdAt?: string;
}
