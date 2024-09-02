import { FGPost } from '@/types/post';
import { createThread } from './thread'; // Import the function to create a thread
import { firestore } from '@/lib/firebase'; 
import { collection, doc, getDoc, DocumentReference } from 'firebase/firestore';

const API_URL = '/api/fg_post';
const threadCollection = collection(firestore, 'threads'); // Reference to the threads collection

export async function createFGPost(fgPostData: Omit<FGPost, 'id'>): Promise<{ id: string; message: string }> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fgPostData),
  });

  if (!response.ok) {
    throw new Error('Failed to create FGPost');
  }

  return await response.json();
}

export async function getFGPost(id: string): Promise<FGPost> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch FGPost');
  }

  return await response.json();
}

export async function getAllFGPosts(): Promise<FGPost[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch FGPosts');
  }

  return await response.json();
}

export async function updateFGPost(id: string, updatedData: Partial<Omit<FGPost, 'id'>>): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Failed to update FGPost');
  }

  return await response.json();
}

export async function deleteFGPost(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete FGPost');
  }

  return await response.json();
}

export async function addThread(fgPostId: string, startThread: string): Promise<{ message: string }> {
  const { id: threadId } = await createThread({ startThread, responses: [] });

  const threadRef = doc(firestore, 'threads', threadId) as DocumentReference;

  const fgPost = await getFGPost(fgPostId);

  return await updateFGPost(fgPostId, {
    thread: [...fgPost.thread, threadRef]
  });
}

export async function removeThread(fgPostId: string): Promise<{ message: string }> {
  const fgPost = await getFGPost(fgPostId);
  const updatedThreads = fgPost.thread.slice(0, -1);
  return await updateFGPost(fgPostId, { thread: updatedThreads });
}
