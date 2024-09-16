import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Header(){
  const [user] = useAuthState(auth);
  const router = useRouter(); 
  const profile = () => {
    router.push('/profile')
  }
  return (
    <div className="h-[8vh] w-screen bg-white flex flex-row items-center justify-between">
      <p className="ml-9 font-body text-black font-medium text-xl">Hi, { user?.displayName || user?.email} 👋</p>
      <img  alt="profile" onClick={profile} className="h-10 w-10 bg-gray-500 mr-4 rounded-3xl hover:cursor-pointer"/>
    </div>
  )
}