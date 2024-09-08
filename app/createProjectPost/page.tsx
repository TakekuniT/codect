"use client"
import React, { useRef, useState, useEffect } from 'react';
import BlackButton1 from '@/components/ui/BlackButton1';

 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SignedIn } from '@/components/signed-in';
import { Loader } from 'lucide-react';
 

import { TechStackArray, CommitmentArray, TimeZoneArray, RoleArray, SkillArray, TechStack, Commitment, TimeZone, Role, Skill } from '@/types/attribute';
import { FGPost } from '@/types/post';
import { createFGPost } from '@/services/fg_post';
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { firestore } from '@/lib/firebase';
import { doc, getDoc, collection } from 'firebase/firestore';
import { getCurrentUser } from '@/services/profile';
import router from 'next/router';


export default function CreateProjectPost () {


    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [techStack, setTechStack] = useState<string[]>([]);
    const [roleAvailability, setRoleAvailability] = useState<string[]>([]);
    const [expectedCommitmentTime, setExpectedCommitmentTime] = useState<string>('');
    const [timeZone, setTimeZone] = useState<string>('');
    const [contact, setContact] = useState<string>('');

    const router = useRouter(); 
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            }
        }
    }, [loading, user, router]);

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: window.innerHeight, 
        behavior: 'smooth'
      });
    }
  };
  const scrollBack = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: -window.innerHeight,
        behavior: 'smooth'
      });
    }
  };
  const selectTags = (value: string) => {
    if (!selectedTags.includes(value)) {
      setSelectedTags([...selectedTags, value]);
    }
  };
  const selectTechStack = (value: string) => {
    if (!techStack.includes(value)) {
      setTechStack([...techStack, value]);
    }
  };
  const selectRoleAvailability =(value:string) => {
    if (!roleAvailability.includes(value)) {
        setRoleAvailability([...roleAvailability, value])
    }
  }
  const submit = async () => {
    console.log(title, description, selectedTags, techStack, roleAvailability, expectedCommitmentTime, timeZone, contact)
    const currentUser = await getCurrentUser(user);

    const postData: Omit<FGPost, 'id'> = {
        timeStamp: new Date().toISOString(),  
        ownerId: currentUser.id,  
        groupMember: [],  
        title: title,
        projectOverview: description,
        skill: selectedTags as Array<Skill>, 
        techstack: techStack as Array<TechStack>,  
        commitment: expectedCommitmentTime as Commitment,  
        role: roleAvailability as Array<Role>,  
        closed: false,
        contact: contact,
        thread: [],  
        timeZone: timeZone as TimeZone
    };

    createFGPost(postData)
        .then((response) => {
            console.log(`FGPost created with ID: ${response.id}, Message: ${response.message}`);
        })
        .catch((error) => {
            console.error('Error creating FGPost:', error.message);
        });
    router.push('/projects')
    
  }
  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        const currentScroll = scrollContainerRef.current.scrollTop;
        const currentSectionIndex = Math.round(currentScroll / window.innerHeight);
        scrollContainerRef.current.scrollTo({
          top: currentSectionIndex * window.innerHeight,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    
    return (
        <>
         {loading ? 
            <div className="flex justify-center items-center w-screen h-screen">
                <Loader className="animate-spin w-10 h-10"></Loader> 
            </div>
            
            : <></>}
        <SignedIn>
        <div  ref={scrollContainerRef} className="overflow-hidden h-screen scroll-snap-y scroll-smooth snap-mandatory">
            <div className="h-full w-full flex justify-center items-center snap-start">
                <div className='w-[50%]'>
                    <p className='font-bold text-[24px]'>What is the title of your project?</p>
                    <input onChange= {(e) => {setTitle(e.target.value)}}className='border-b-2 border-gray-500 w-full mb-4 px-4 py-2'/>
                    <BlackButton1 text="Next" onClick={scrollNext}/>

                </div>
                
            </div>
            <div className="h-full w-full flex justify-center items-center snap-start">
                <div className='w-[50%] '>
                    <p className='font-bold text-[24px]'>Project Overview</p>
                    <textarea onChange={(e) => {setDescription(e.target.value)}} placeholder='project description' className='border w-full'/>
                    <div className='flex gap-2'>
                        <BlackButton1 text="Back" onClick={scrollBack}/>
                        <BlackButton1 text="Next" onClick={scrollNext}/>

                    </div>
                

                </div>
               
            </div>
            <div className="h-full w-full flex justify-center items-center snap-start">
                <div className='w-[50%] '>
                    <p className='font-bold text-[24px] mb-4'>Add Tags</p>
                    <Select onValueChange={selectTags}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select tags" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tags</SelectLabel>
                                
                                {SkillArray.map(skill => (
                                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm"
                        >
                            {tag}
                        </span>
                        ))}
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <BlackButton1 text="Back" onClick={scrollBack}/>
                        <BlackButton1 text="Next" onClick={scrollNext}/>

                    </div>
                

                </div>
               
            </div>
            <div className="h-full w-full flex justify-center items-center snap-start">
                <div className='w-[50%] '>
                    <p className='font-bold text-[24px] mb-4'>Tech Stack</p>
                    <Select onValueChange={selectTechStack} >
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select tags" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Tags</SelectLabel>
                                {TechStackArray.map(tech => (
                                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {techStack.map((language) => (
                        <span
                            key={language}
                            className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm"
                        >
                            {language}
                        </span>
                        ))}
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <BlackButton1 text="Back" onClick={scrollBack}/>
                        <BlackButton1 text="Next" onClick={scrollNext}/>

                    </div>
                

                </div>
               
            </div>
            <div className="h-full w-full flex justify-center items-center snap-start">
                <div className='w-[50%] '>
                    <p className='font-bold text-[24px] mb-4'>Role Availability</p>
                    
                        <Select onValueChange={selectRoleAvailability}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select tag" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Tags</SelectLabel>
                                    {RoleArray.map(role => (
                                        <SelectItem key={role} value={role}>{role}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="mt-4 flex flex-wrap gap-2">
                        {roleAvailability.map((role) => (
                        <span
                            key={role}
                            className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm"
                        >
                            {role}
                        </span>
                        ))}
                    </div>
                      
                   
                    <div className='flex gap-2 mt-4'>
                        <BlackButton1 text="Back" onClick={scrollBack}/>
                        <BlackButton1 text="Next" onClick={scrollNext}/>

                    </div>
                

                </div>
               
            </div>
            <div className="h-full w-full flex justify-center items-center snap-start">
                <div className='w-[50%] '>
                    <p className='font-bold text-[24px] mb-4'>Expected commitment time</p>
                    <Select onValueChange={(e) => {setExpectedCommitmentTime(e)}}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select tags" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Tags</SelectLabel>
                                {CommitmentArray.map(commitment => (
                                    <SelectItem key={commitment} value={commitment}>{commitment}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className='flex gap-2 mt-4'>
                        <BlackButton1 text="Back" onClick={scrollBack}/>
                        <BlackButton1 text="Next" onClick={scrollNext}/>

                    </div>
                

                </div>
               
            </div>
            <div className="h-full w-full flex justify-center items-center snap-start">
                <div className='w-[50%] '>
                    
                    <p className='font-bold text-[24px] mb-4 mt-4'>Time Zone</p>
                    <Select onValueChange={(e) => {setTimeZone(e)}}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select tags" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Tags</SelectLabel>
                                {TimeZoneArray.map(timezone => (
                                    <SelectItem key={timezone} value={timezone}>{timezone}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className='flex gap-2 mt-4'>
                        <BlackButton1 text="Back" onClick={scrollBack}/>
                        <BlackButton1 text="Next" onClick={scrollNext}/>

                    </div>
                

                </div>
               
            </div>
            <div className="h-full w-full flex justify-center items-center snap-start">
                <div className='w-[50%]'>
                    <p className='font-bold text-[24px]'>Contact</p>
                    <input onChange={(e) => setContact(e.target.value)} className='border-b-2 border-black w-full mb-4 px-4 py-2'/>
                    <div className='flex gap-2 mt-4'>
                        <BlackButton1 text="Back" onClick={scrollBack}/>
                        <BlackButton1 text="Post" onClick={submit}/>

                    </div>

                </div>
                
            </div>
            
        </div>
        </SignedIn>
        </>
    )
}