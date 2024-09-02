import { NextRequest, NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase'; 
import { Profile } from '@/types/profile'; 
import { QueryDocumentSnapshot, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const profilesCollection = collection(firestore, 'profile');

// Create a new profile, POST
export async function POST(req: NextRequest) {
  try {
    const { name, userName, email, github, linkedin, skills, techstack, contact } = await req.json();
    const newProfile = await addDoc(profilesCollection, { name, userName, email, github, linkedin, skills, techstack, contact });
    return NextResponse.json({ id: newProfile.id, message: 'Profile created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}

// Get a profile by ID, GET
export async function GET(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (id) {
      const docRef = doc(profilesCollection, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
      }
      const data = docSnap.data();
      const profile: Profile = {
        id: docSnap.id,
        name: data.name || '',
        userName: data.userName || '',
        email: data.email || '',
        github: data.github || '',
        linkedin: data.linkedin || '',
        skills: data.skills || [],
        techstack: data.techstack || [],
        contact: data.contact || []
      };
      return NextResponse.json(profile, { status: 200 });
    } else {
      const snapshot = await getDocs(profilesCollection);
      const profiles: Profile[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        const profile: Profile = {
          id: doc.id,
          name: data.name || '',
          userName: data.userName || '',
          email: data.email || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          skills: data.skills || [],
          techstack: data.techstack || [],
          contact: data.contact || []
        };
        return profile;
      });
      return NextResponse.json(profiles, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}

// Update a profile by ID, PUT
export async function PUT(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const { name, userName, email, github, linkedin, skills, techstack, contact } = await req.json();
    const docRef = doc(profilesCollection, id as string);
    await updateDoc(docRef, { name, userName, email, github, linkedin, skills, techstack, contact });
    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

// Delete a profile by ID, DELETE
export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const docRef = doc(profilesCollection, id as string);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'Profile deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}
