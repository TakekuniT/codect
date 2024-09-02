import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function Header(){
  const [user, loading] = useAuthState(auth);
  return (
    <div className="h-[8%] w-screen bg-white flex flex-row items-center justify-between">
      <p className="ml-9 font-body text-black font-medium text-xl">Hi, {user?.displayName} 👋</p>
      <img className="h-10 w-10 bg-gray-500 mr-4 rounded-3xl"/>
    </div>
  )
}