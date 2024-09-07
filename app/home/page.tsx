"use client";
import Sidenavbar from "@/components/sidenavbar"
import Header from "@/components/header";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase";

export default function Home () {

    const [user, loading] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    return (
        <div className="bg-[#f6f6f6] h-screen">
            <Header/>
            <Sidenavbar/>
        </div>
    )
}