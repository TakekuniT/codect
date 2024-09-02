import { NextRequest, NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase'; 
import { FGPost } from '@/types/post'; 
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const fgPostsCollection = collection(firestore, 'fg_post');

// Create a new FGPost, POST
export async function POST(req: NextRequest) {
  try {
    const {
      ownerId,
      groupMember,
      groupType,
      title,
      projectOverview,
      skill,
      techstack,
      commitment,
      role,
      closed,
      contact,
      thread,
      timeZone
    } = await req.json();

    const newFGPost = await addDoc(fgPostsCollection, {
      ownerId,
      groupMember,
      groupType,
      title,
      projectOverview,
      skill,
      techstack,
      commitment,
      role,
      closed,
      contact,
      thread,
      timeZone
    });

    return NextResponse.json({ id: newFGPost.id, message: 'FGPost created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FGPost' }, { status: 500 });
  }
}

// Get an FGPost by ID, GET
export async function GET(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    
    if (id) {
      const docRef = doc(fgPostsCollection, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json({ error: 'FGPost not found' }, { status: 404 });
      }

      const data = docSnap.data();
      const fgPost: FGPost = {
        id: docSnap.id,
        timeStamp: data.timeStamp || '',
        ownerId: data.ownerId || '',
        groupMember: data.groupMember || [],
        groupType: data.groupType || '',
        title: data.title || '',
        projectOverview: data.projectOverview || '',
        skill: data.skill || [],
        techstack: data.techstack || [],
        commitment: data.commitment || '',
        role: data.role || [],
        closed: data.closed || false,
        contact: data.contact || '',
        thread: data.thread || [],
        timeZone: data.timeZone || undefined
      };

      return NextResponse.json(fgPost, { status: 200 });
    } else {
      const snapshot = await getDocs(fgPostsCollection);
      const fgPosts: FGPost[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          timeStamp: data.timeStamp || '',
          ownerId: data.ownerId || '',
          groupMember: data.groupMember || [],
          groupType: data.groupType || '',
          title: data.title || '',
          projectOverview: data.projectOverview || '',
          skill: data.skill || [],
          techstack: data.techstack || [],
          commitment: data.commitment || '',
          role: data.role || [],
          closed: data.closed || false,
          contact: data.contact || '',
          thread: data.thread || [],
          timeZone: data.timeZone || undefined
        };
      });

      return NextResponse.json(fgPosts, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FGPosts' }, { status: 500 });
  }
}

// Update an FGPost by ID, PUT
export async function PUT(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const {
      timeStamp,
      ownerId,
      groupMember,
      groupType,
      title,
      projectOverview,
      skill,
      techstack,
      commitment,
      role,
      closed,
      contact,
      thread,
      timeZone
    } = await req.json();

    const docRef = doc(fgPostsCollection, id as string);
    await updateDoc(docRef, {
      timeStamp,
      ownerId,
      groupMember,
      groupType,
      title,
      projectOverview,
      skill,
      techstack,
      commitment,
      role,
      closed,
      contact,
      thread,
      timeZone
    });

    return NextResponse.json({ message: 'FGPost updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update FGPost' }, { status: 500 });
  }
}

// Delete an FGPost by ID, DELETE
export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const docRef = doc(fgPostsCollection, id as string);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'FGPost deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FGPost' }, { status: 500 });
  }
}
