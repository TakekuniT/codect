import { SCPost } from '@/types/post';

const API_URL = '/api/sc_post';

export async function createSCPost(scPostData: Omit<SCPost, 'id' | 'timeStamp'>): Promise<{ id: string; message: string }> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...scPostData,
      timeStamp: new Date().toISOString(), 
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create SCPost');
  }

  return await response.json();
}

export async function getSCPost(id: string): Promise<SCPost> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch SCPost');
  }

  return await response.json();
}

export async function getAllSCPosts(): Promise<SCPost[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch SCPosts');
  }

  return await response.json();
}

export async function updateSCPost(id: string, updatedData: Omit<SCPost, 'id' | 'timeStamp'>): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Failed to update SCPost');
  }

  return await response.json();
}

export async function deleteSCPost(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete SCPost');
  }

  return await response.json();
}
