import { TechStack, Skill } from "./attribute";
export interface Profile {
    id: string;
	name: string;
    userName: string;
    email: string;
    github: string;
    linkedin: string;
    skills: Array<Skill>;
    techstack: Array<TechStack>;
    contact: Array<object>;
}

