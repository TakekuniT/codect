import { Profile } from '@/types/profile'; 

const API_URL = '/api/profile';


import { firestore } from '@/lib/firebase';
import { doc, getDoc, collection } from 'firebase/firestore';
import { User } from 'firebase/auth';

export async function getCurrentUserId(user: User | null | undefined): Promise<string>{
  if (!user || !user.email) {
    throw new Error('User is not authenticated');
  }

  const userDocRef = doc(collection(firestore, 'users'), user?.email?.toString());
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    const profileId = docSnap.data()?.userId;
    console.log("Profile ID:", profileId);
    return profileId; 
  } else {
    throw new Error('Failed to get current user');
  }
}

export async function getCurrentUser(user: User | null | undefined): Promise<Profile> {
  if (!user || !user.email) {
    throw new Error('User is not authenticated');
  }

  const userDocRef = doc(collection(firestore, 'users'), user?.email?.toString());
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    const profileId = docSnap.data().userId;
    console.log("Profile ID:", profileId);
    return getProfile(profileId);
  } else {
    throw new Error('Failed to get current user');
  }
}


export async function createProfile(profileData: Omit<Profile, 'id'>): Promise<{ id: string; message: string }> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error('Failed to create profile');
  }

  return await response.json();
}

export async function getProfile(id: string): Promise<Profile> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return await response.json();
}

export async function getAllProfiles(): Promise<Profile[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profiles');
  }

  return await response.json();
}

export async function updateProfile(id: string, updatedData: Omit<Profile, 'id'>): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return await response.json();
}

export async function deleteProfile(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete profile');
  }

  return await response.json();
}
