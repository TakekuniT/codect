"use client";
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { getDoc, setDoc, doc, collection } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

export default function ForgotPassword(){
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [signInWithGoogle, userGoogle] = useSignInWithGoogle(auth);
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email);
    router.push('/login');
  }
    const googleSignIn = async () => {
      await signInWithGoogle(); 
      
      
      if(userGoogle){
        const myUser = userGoogle.user; 
        const docRef = doc(collection(firestore, 'users'), myUser.email);
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()){
        setDoc(docRef, {"name": userGoogle.user.displayName,"username": "", "userId": "", "password": ""})
        }
      router.push('/home');
    }
      }
  return (
    <div className="flex justify-center items-center h-screen bg-[#f6f6f6]">
            <div className="bg-white w-[30%] flex flex-col p-8 rounded-lg ">
                <p className="text-[24px] font-semibold mx-auto">Forgot Password</p>
                <p className="text-[14px] text-gray-500 mx-auto">Already have an account? <a href="/login">Login</a></p>
                <div className="mt-10">
                    <p className="text-[14px]">Email</p>
                    <input onChange={(e) => setEmail(e.target.value)}
                    className="border-black border-[1px] rounded-lg w-full px-4 py-1"
                    value={email}
                    />
                </div>
                <button  onClick={resetPassword}className="bg-black text-white rounded-lg p-1 text-[16px] mt-6">Reset Password</button>
                <div className="mt-6 flex items-center">
                    <hr className="flex-grow border-t border-gray-300" />
                    <div className="relative px-2">
                        <p className="text-[12px]">OR</p>
                    </div>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
                
                <button onClick={googleSignIn}className="w-full border-[1px] border-black rounded-lg mt-6 p-2 text-[14px] font-semibold">Login with Google</button>
            </div>
            
        </div>
  )
}