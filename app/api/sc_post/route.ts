import { NextRequest, NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase';
import { SCPost } from '@/types/post';
import { QueryDocumentSnapshot, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const scPostsCollection = collection(firestore, 'sc_post');

// Create a new SCPost, POST
export async function POST(req: NextRequest) {
    try {
      const { likes, comments, title, imageThumbnail, video, description, skill, techStack, ownerId } = await req.json();
      const timeStamp = new Date().toISOString(); // Generate the current timestamp
      const newSCPost = await addDoc(scPostsCollection, { likes, comments, title, imageThumbnail, video, description, skill, techStack, ownerId, timeStamp });
      return NextResponse.json({ id: newSCPost.id, message: 'SCPost created successfully' }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create SCPost' }, { status: 500 });
    }
}
  

// Get an SCPost by ID, GET
export async function GET(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (id) {
      const docRef = doc(scPostsCollection, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return NextResponse.json({ error: 'SCPost not found' }, { status: 404 });
      }
      const data = docSnap.data();
      const scPost: SCPost = {
        id: docSnap.id,
        likes: data.likes || 0,
        comments: data.comments || [],
        title: data.title || '',
        imageThumbnail: data.imageThumbnail || '',
        video: data.video || '',
        description: data.description || '',
        skill: data.skill || [],
        techStack: data.techStack || [],
        timeStamp: data.timeStamp || '',
        ownerId: data.ownerId || ''
      };
      return NextResponse.json(scPost, { status: 200 });
    } else {
      const snapshot = await getDocs(scPostsCollection);
      const scPosts: SCPost[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        const scPost: SCPost = {
          id: doc.id,
          likes: data.likes || 0,
          comments: data.comments || [],
          title: data.title || '',
          imageThumbnail: data.imageThumbnail || '',
          video: data.video || '',
          description: data.description || '',
          skill: data.skill || [],
          techStack: data.techStack || [],
          timeStamp: data.timeStamp || '',
          ownerId: data.ownerId || ''
        };
        return scPost;
      });
      return NextResponse.json(scPosts, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch SCPosts' }, { status: 500 });
  }
}

// Update an SCPost by ID, PUT
export async function PUT(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const { likes, comments, title, imageThumbnail, video, description, skill, techStack } = await req.json();
    const docRef = doc(scPostsCollection, id as string);
    await updateDoc(docRef, { likes, comments, title, imageThumbnail, video, description, skill, techStack });
    return NextResponse.json({ message: 'SCPost updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update SCPost' }, { status: 500 });
  }
}

// Delete an SCPost by ID, DELETE
export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const docRef = doc(scPostsCollection, id as string);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'SCPost deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete SCPost' }, { status: 500 });
  }
}
