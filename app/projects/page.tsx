"use client";
import Sidenavbar from "@/components/sidenavbar"
import BlackButton1 from "@/components/ui/BlackButton1"
import FgPostTemplate from "@/components/fgpostTemplate"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Loader } from "lucide-react";
import Header from "@/components/header";
import { SignedIn } from "@/components/signed-in";





export default function projects() {
    const router = useRouter(); 
    const [user, loading] = useAuthState(auth); 
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
                <Header></Header>
                <div className="bg-[#f6f6f6] h-screen flex">
                    
                    <Sidenavbar/>
                    <div className="p-10 w-1/2">
                        <a href="createProjectPost">
                        <BlackButton1 text="+ Create Project" />

                        </a>
                        
                        <FgPostTemplate/>
                    
                        

                    </div>
                    <div className="w-1/2">

                    </div>
                </div>
            </SignedIn>
            
        </>
    )
}