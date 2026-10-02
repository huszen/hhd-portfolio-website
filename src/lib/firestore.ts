import { db } from './firebase';

import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, query, orderBy, updateDoc } from 'firebase/firestore';

import { Profile, Project, Certificate } from '@/types/portfolio';

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
