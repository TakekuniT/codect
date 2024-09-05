"use client";
import Sidenavbar from "@/components/sidenavbar"
import Header from "@/components/header";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { SignedIn } from "@/components/signed-in";

export default function Home () {
    const router = useRouter(); 
    const [user, loading] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            }
        }
    }, [loading, user, router]);
    return (
        <>
            {loading ? 
            <div className="flex justify-center items-center w-screen h-screen">
                <Loader className="animate-spin w-10 h-10"></Loader> 
            </div>
            
            : <></>}
            <SignedIn>
                <div className="bg-[#f6f6f6] h-screen">
                <Header/>
                <Sidenavbar/>
                </div>
            </SignedIn>
        </>

    )
}