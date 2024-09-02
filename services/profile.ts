import { Profile } from '@/types/profile'; 

const API_URL = '/api/profile';

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
