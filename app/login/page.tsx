"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/lib/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

export default function Login() {
    const router = useRouter();

    const [signInUserWithEmailAndPassword, user] = useSignInWithEmailAndPassword(auth);
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if(usernameOrEmail.indexOf('@') > -1){ //entered an email
            await signInUserWithEmailAndPassword(usernameOrEmail, password);
            if(typeof user === 'undefined'){ //unsuccessful signin
                alert('Your email or password is incorrect.');
            }else{  //successful signin
                router.push('/home');
            }
        } else{ //did not enter email
            alert('You did not enter an email.');
        }
      };
    return (
        <div className="flex justify-center items-center h-screen bg-[#f6f6f6]">
            <div className="bg-white w-[30%] flex flex-col p-8 rounded-lg ">
                <p className="text-[24px] font-semibold mx-auto">Welcome Back</p>
                <p className="text-[14px] text-gray-500 mx-auto">Dont have an account yet? <a href="/signup">Sign Up</a></p>
                <div className="mt-10">
                    <p className="text-[14px]">Username or Email</p>
                    <input onChange={(e) => setUsernameOrEmail(e.target.value)}
                    value={usernameOrEmail}
                    className="border-black border-[1px] rounded-lg w-full px-4 py-1"
                    />

                </div>
                <div className="mt-2">
                    <p className="text-[14px]">Password</p>
                    <input onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    value={password}
                    className="border-black border-[1px] rounded-lg w-full px-4 py-1"
                    />

                </div>
                <p className="ml-auto mr-0 text-[12px] mt-2 text-gray-500">Forgot password?</p>
                <button onClick={login}className="bg-black text-white rounded-lg p-1 text-[16px] mt-6"><a href="/home">Login</a></button>
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
    )
}

