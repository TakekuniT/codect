import { auth } from '@/lib/firebase';
import { House,UserPen, PanelsTopLeft, LogOut  } from 'lucide-react';
import { useSignOut } from 'react-firebase-hooks/auth';

export default function Sidenavbar () {
    const [signOut] = useSignOut(auth);
    return (
        <div className="w-[5%] bg-white h-[100%]">
            <div className="flex flex-col pt-8 gap-4 items-center">
                <a href="/home">
                    <House />

                </a>
                
                <UserPen/>
                <a href="/projects">
                    <PanelsTopLeft/>
                </a>
                <a href="/myprojects">
                    <PanelsTopLeft/>
                </a>
                <LogOut className="absolute bottom-4 hover:cursor-pointer" onClick={signOut}/>
            </div> 
        </div>
    )
}

