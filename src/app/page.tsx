import { doc, collection, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Profile, Project, Certificate } from '@/types/portfolio';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import SkillsSection from '@/components/home/SkillsSection';
import ProjectsSection from '@/components/home/ProjectSection';
import CertificatesSection from '@/components/home/CertificatesSection';

// Fetch profile data from firestore
async function getProfileData(): Promise<Profile | null> {
  try {
    const profileDocRef = doc(db, 'profile', 'main');
    const profileSnap = await getDoc(profileDocRef);

    if (profileSnap.exists()) {
      return profileSnap.data() as Profile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
}

// Fetch projects list sorted by creation date
async function getProjectsData(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('createdAt'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Project[];
  } catch (error) {
    console.error('Error fetching projects data:', error);
    return [];
  }
}

// Fetch certificates list sorted by creation date
async function getCertificatesData(): Promise<Certificate[]> {
  try {
    const certsRef = collection(db, 'certificates');
    const q = query(certsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Certificate[];
  } catch (error) {
    console.error('Error Fetching Certificates Data:', error);
    return [];
  }
}

// Main Public Homepage Component
export default async function Homepage() {
  // Fetch data in parallel for optimal loading performance
  const [profile, projects, certificates] = await Promise.all([getProfileData(), getProjectsData(), getCertificatesData()]);

  return (
    <div className="min-h-screen bg-bg-main text-text-main flex flex-col font-sans selection:bg-primary selection:text-bg-card">
      {/* Sticky Navigation Bar */}
      <Navbar fullName={profile?.fullName} resumeUrl={profile?.resumeUrl} />

      {/* Main Content Sections Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-20">
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={profile?.skills} />
        <ProjectsSection projects={projects} />
        <CertificatesSection certificates={certificates} />
      </main>

      {/* Layout Footer */}
      <Footer fullName={profile?.fullName} socialLinks={profile?.socialLinks} />
    </div>
  );
}
