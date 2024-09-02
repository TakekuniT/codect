export interface Profile {
    id: string;
	name: string;
    userName: string;
    email: string;
    github: string;
    linkedin: string;
    skills: Array<string>;
    techstack: Array<string>;
    contact: Array<[string,string]>;
}

export interface ProfileWithId extends Profile {
    id: string;
  }