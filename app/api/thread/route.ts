import { NextRequest, NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase';
import { Thread } from '@/types/thread';
import { QueryDocumentSnapshot, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const threadsCollection = collection(firestore, 'thread');

// Create a new Thread, POST
export async function POST(req: NextRequest) {
  try {
    const { startThread, responses } = await req.json();
    const newThread = await addDoc(threadsCollection, { startThread, responses });
    return NextResponse.json({ id: newThread.id, message: 'Thread created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
  }
}

// Get a Thread by ID, GET
export async function GET(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (id) {
      const docRef = doc(threadsCollection, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
      }
      const data = docSnap.data();
      const thread: Thread = {
        id: docSnap.id,
        startThread: data.startThread || '',
        responses: data.responses || []
      };
      return NextResponse.json(thread, { status: 200 });
    } else {
      const snapshot = await getDocs(threadsCollection);
      const threads: Thread[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        const thread: Thread = {
          id: doc.id,
          startThread: data.startThread || '',
          responses: data.responses || []
        };
        return thread;
      });
      return NextResponse.json(threads, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 });
  }
}

// Update a Thread by ID, PUT
export async function PUT(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const { startThread, responses } = await req.json();
    const docRef = doc(threadsCollection, id as string);
    await updateDoc(docRef, { startThread, responses });
    return NextResponse.json({ message: 'Thread updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update thread' }, { status: 500 });
  }
}

// Delete a Thread by ID, DELETE
export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const docRef = doc(threadsCollection, id as string);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'Thread deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete thread' }, { status: 500 });
  }
}
