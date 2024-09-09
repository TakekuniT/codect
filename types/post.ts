import { GroupType, TimeZone, TechStack, Skill, Commitment, Role } from "./attribute";
import { DocumentReference } from 'firebase/firestore';  // Ensure this is from 'firebase/firestore' for client-side

export interface Post {
    id: string;
	timeStamp: string;
    ownerId: string;
}

export interface FGPost extends Post {
    groupMember: Array<string>;
    title: string;
    projectOverview: string;
    skill: Array<Skill>;
    techstack: Array<TechStack>;
    commitment: Commitment;
    role: Array<Role>;
    closed: Boolean;
    contact: String;
    thread: Array<DocumentReference>;
    interested: Array<string>;
    timeZone?: TimeZone;
}

export interface SCPost extends Post {
    likes: number;
    comments: Array<string>; 
    title?: string;
    imageThumbnail?: string;
    video?: string;
    description?: string;
    skill?: Array<Skill>;
    techStack?: Array<TechStack>;
}

