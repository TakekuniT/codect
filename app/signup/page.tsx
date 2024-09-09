"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithEmailAndPassword, useSignInWithGoogle, } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/lib/firebase";
import { doc, collection, getDoc, setDoc, } from '@firebase/firestore';
import { createProfile } from '@/services/profile';
import { SignedOut } from '@/components/signed-out';
import { Loader } from 'lucide-react';

export default function SignUp() {
    const router = useRouter();
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, userGoogle] = useSignInWithGoogle(auth);
    const [user1, loading1] = useAuthState(auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (!loading1) {
            if (user1) {
                router.push('/projects');
            }
        }
    }, [loading1, user1, router]);

    const signup = async () => {
        if (password.length < 6){
            alert("Password must be at least 6 characters in length.");
        }else if (email.indexOf('@') < 0){
            alert("Did not enter a valid email address");
        }else{
            const docRef = doc(collection(firestore, 'users'), email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){  //user with that email already exists 
                alert('That email is already used.');
            }else{
                const userProfile = createProfile({
                    userName: username, 
                    email: email,
                    name: '',
                    github: '',
                    linkedin: '',
                    skills: [],
                    techstack: [],
                    contact: []
                })
                await setDoc(docRef, {"name": "","username": username, "userId": (await userProfile).id, "password": password});
                await createUser(email, password);
                await sendEmailVerification();
                await signInUserWithEmailAndPassword(email, password);
                router.push('/projects');
            }

        }
      };

    const googleSignIn = async () => {
        await signInWithGoogle(); 
        
        if(userGoogle){
            const myUser = userGoogle.user;
            const docGoogleRef = doc(collection(firestore, 'users'), myUser.email?.toString());
            const docSnap = await getDoc(docGoogleRef);
            if(!docSnap.exists()){
                const userProfile = createProfile({
                    userName: '', 
                    email: userGoogle.user.email || '',
                    name: userGoogle.user.displayName || '',
                    github: '',
                    linkedin: '',
                    skills: [],
                    techstack: [],
                    contact: []
                })
                setDoc(docGoogleRef, {"name": userGoogle.user.displayName,"username": "", "userId": (await userProfile).id, "password": ""})
                sendEmailVerification(); 
            }
            router.push('/projects');
        }
    }

    return (
        <>
            {loading1 ? 
            <div className="flex justify-center items-center w-screen h-screen">
                <Loader className="animate-spin w-10 h-10"></Loader> 
            </div>
            
            : <></>}
            <SignedOut>
            <div className="flex justify-center items-center h-screen bg-[#f6f6f6]">
                <div className="bg-white w-[30%] flex flex-col p-8 rounded-lg ">
                    <p className="text-[24px] font-semibold mx-auto">Get Started</p>
                    <p className="text-[14px] text-gray-500 mx-auto">Already have an account? <a href="/login">Login</a></p>
                    <div className="mt-10">
                        <p className="text-[14px]">Email</p>
                        <input onChange={(e) => setEmail(e.target.value)}
                        className="border-black border-[1px] rounded-lg w-full px-4 py-1"
                        value={email}
                        />

                    </div>
                    <div className="mt-2">
                        <p className="text-[14px]">Username</p>
                        <input 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="border-black border-[1px] rounded-lg w-full px-4 py-1"
                        />

                    </div>
                    <div className="mt-2">
                        <p className="text-[14px]">Password</p>
                        <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border-black border-[1px] rounded-lg w-full px-4 py-1"
                        />

                </div>
                
                <button  onClick={signup}className="bg-black text-white rounded-lg p-1 text-[16px] mt-6">Sign Up</button>
                <div className="mt-6 flex items-center">
                    <hr className="flex-grow border-t border-gray-300" />
                    <div className="relative px-2">
                        <p className="text-[12px]">OR</p>
                    </div>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
                
                <button className="w-full border-[1px] border-black rounded-lg mt-6 p-2 text-[14px] font-semibold">Login with Google</button>
            </div>
            
        </div>
        </SignedOut>
        </>
    )
}