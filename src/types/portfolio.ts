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

// Interface untuk Projek Portfolio
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

// Interface untuk Sertifikasi
export interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  bannerUrl: string;
  credentialUrl: string;
  createdAt: string;
}
