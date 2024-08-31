import { House,UserPen, PanelsTopLeft  } from 'lucide-react';

export default function Sidenavbar () {
    return (
        <div className="w-[5%] bg-white h-screen flex flex-col gap-4 items-center pt-8">
            <House />
            <UserPen/>
            <PanelsTopLeft/>
        </div>
    )
}

