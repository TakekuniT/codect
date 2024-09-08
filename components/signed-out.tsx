import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

type Props = {
  children: ReactNode; 
};
//content you want to show when user is signed out
export const SignedOut = ({children}: Props) => {
  const [user] = useAuthState(auth);
  if (user) return null;

  return <>{children}</>
};