import { db } from './firebase';

import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, query, orderBy, updateDoc, where, limit } from 'firebase/firestore';

import { Profile, Project, Certificate, Experience } from '@/types/portfolio';

// ==========================================
// 1. PROFILE FUNCTIONS
// ==========================================

// Fetching profile data
export async function getProfile(): Promise<Profile | null> {
  try {
    const docRef = doc(db, 'profile', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    }

    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

// Saving / Updating Profile Data
export async function updateProfile(data: Profile): Promise<boolean> {
  try {
    const docRef = doc(db, 'profile', 'main');
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
}

// ==========================================
// 2. PROJECT FUNCTIONS
// ==========================================

// Fetching Projects Data
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Project);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Create new project
export async function addProject(projectData: Omit<Project, 'id'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'projects'), projectData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

// Update project
export async function updateProject(id: string, projectData: Partial<Project>): Promise<boolean> {
  try {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, projectData);
    return true;
  } catch (error) {
    console.error('Error updateing project:', error);
    return false;
  }
}

// Delete project
export async function deleteProject(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'projects', id));
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

// Get the project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const q = query(collection(db, 'projects'), where('slug', '==', slug), limit(1));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as Project;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

// ==========================================
// 3. CERTIFICATE FUNCTIONS
// ==========================================

// Fetching certificates data
export async function getCertificates(): Promise<Certificate[]> {
  try {
    const q = query(collection(db, 'certificates'), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Certificate);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
}

// Create new certificate
export async function addCertificate(certData: Omit<Certificate, 'id'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'certificates'), certData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating certificate:', error);
    return null;
  }
}

// Delete Certificate
export async function deleteCertificate(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'certificates', id));
    return true;
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return false;
  }
}

// ==========================================
// 4. EXPERIENCE FUNTIONS
// ==========================================

// Fetch experiences data
export async function getExperiences(): Promise<Experience[]> {
  try {
    const q = query(collection(db, 'experiences'), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Experience);
  } catch (error) {
    console.error('Failed to fetch Experiences data:', error);
    return [];
  }
}

// Create new Experience
export async function addExperience(expData: Omit<Experience, 'id'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'experiences'), {
      ...expData,
      createdAt: expData.createdAt || new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating experience:', error);
    return null;
  }
}

// Update experience
export async function updateExperience(id: string, expData: Partial<Experience>): Promise<boolean> {
  try {
    const docRef = doc(db, 'experiences', id);
    await updateDoc(docRef, expData);
    return true;
  } catch (error) {
    console.error('Error updating experience:', error);
    return false;
  }
}

// Delete experience
export async function deleteExperience(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'experiences', id));
    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    return false;
  }
}
