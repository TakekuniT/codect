import { Thread } from '@/types/thread';

const API_URL = '/api/thread';

// Create a new Thread
export async function createThread(thread: Omit<Thread, 'id'>): Promise<Response> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thread),
    });
    return response;
  } catch (error) {
    throw new Error('Failed to create thread');
  }
}

// Get a Thread by ID
export async function getThread(id: string): Promise<Thread> {
  try {
    const response = await fetch(`${API_URL}?id=${id}`);
    if (!response.ok) {
      throw new Error('Thread not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch thread');
  }
}

// Get all Threads
export async function getAllThreads(): Promise<Thread[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch threads');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch threads');
  }
}

// Delete a Thread by ID
export async function deleteThread(id: string): Promise<Response> {
  try {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete thread');
    }
    return response;
  } catch (error) {
    throw new Error('Failed to delete thread');
  }
}

// Add a response to a Thread
export async function addResponse(id: string, response: string): Promise<Response> {
  try {
    const currentThread = await getThread(id);
    const updatedResponses = [...currentThread.responses, response];
    const res = await fetch(`${API_URL}?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...currentThread, responses: updatedResponses }),
    });
    if (!res.ok) {
      throw new Error('Failed to add response');
    }
    return res;
  } catch (error) {
    throw new Error('Failed to add response');
  }
}

// Delete the last response from a Thread
export async function deleteResponse(id: string): Promise<Response> {
  try {
    const currentThread = await getThread(id);
    const updatedResponses = currentThread.responses.slice(0, -1);
    const res = await fetch(`${API_URL}?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...currentThread, responses: updatedResponses }),
    });
    if (!res.ok) {
      throw new Error('Failed to delete response');
    }
    return res;
  } catch (error) {
    throw new Error('Failed to delete response');
  }
}
