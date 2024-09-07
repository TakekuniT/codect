import { Thread } from '@/types/thread';

const API_URL = '/api/thread';

export async function createThread(threadData: Omit<Thread, 'id'>): Promise<{ id: string; message: string }> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(threadData),
  });

  if (!response.ok) {
    throw new Error('Failed to create thread');
  }

  return await response.json();
}

export async function getThread(id: string): Promise<Thread> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch thread');
  }

  return await response.json();
}

export async function getAllThreads(): Promise<Thread[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch threads');
  }

  return await response.json();
}

export async function updateThread(id: string, updatedData: Partial<Omit<Thread, 'id'>>): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Failed to update thread');
  }

  return await response.json();
}

export async function deleteThread(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete thread');
  }

  return await response.json();
}

export async function addResponse(id: string, response: string): Promise<{ message: string }> {
  const thread = await getThread(id);
  thread.responses.push(response);
  return await updateThread(id, { responses: thread.responses });
}

export async function deleteResponse(id: string): Promise<{ message: string }> {
  const thread = await getThread(id);
  thread.responses.pop();
  return await updateThread(id, { responses: thread.responses });
}
