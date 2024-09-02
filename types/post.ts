import internal from "stream";
import { GroupType, TimeZone, TechStack, Skill, Commitment, Role } from "./attribute";
import { firestore } from 'firebase-admin';

export interface Post {
    id: string;
	timeStamp: string;
    ownerId: string;
}

export interface FGPost extends Post {
    groupMember: Array<string>;
    groupType: GroupType;
    title: string;
    projectOverview: string;
    skill: Array<Skill>;
    techstack: Array<TechStack>;
    commitment: Commitment;
    role: Array<Role>;
    closed: Boolean;
    contact: String;
    thread: firestore.DocumentReference;
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

