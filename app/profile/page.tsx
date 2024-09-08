"use client";
import Header from "@/components/header";
import Sidenavbar from "@/components/sidenavbar";
import { SignedIn } from "@/components/signed-in";
import { auth } from "@/lib/firebase";
import { getCurrentUser, getProfile } from "@/services/profile";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import type { Profile } from "@/types/profile";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProfile as updateUser } from "firebase/auth";
import { updateProfile } from "@/services/profile";

export default function Profile () {
  const router = useRouter(); 
  const [user, loading] = useAuthState(auth); 
  const [currProfile, setCurrProfile] =  useState<Profile | null>(null); 
  const [addName, setName] = useState("");
  useEffect(() => {
      if (!loading) {
          if (!user) {
              router.push('/login');
          }else{
            getCurrentUser(user).then(profile => {
              setCurrProfile(profile);
            }).catch(error =>{
              console.error(error);
            })
          }
      }
  }, [loading, user, router]);
  const updateName = () => {
    updateProfile(, {
      name: addName
    })
  }

    return (
    <>
      {loading ? 
            <div className="flex justify-center items-center w-screen h-screen">
                <Loader className="animate-spin w-10 h-10"></Loader> 
            </div>
            
            : <></>}
        <SignedIn>
          <Header/>
       <div className="bg-[#f6f6f6] h-[200vh] flex">
       <Sidenavbar/>
        <div className="flex flex-col relative">
          <div className="ml-12 bg-pink-300 w-[55rem] h-[12rem] mt-8"/>
          <img className="h-[10rem] w-[10rem] bg-slate-400 left-16 border-white rounded-[5rem] border-[2.5px] absolute top-[9rem]"/>
          <div className="bg-white w-[55rem] h-[14rem] ml-12">
            <div className="flex flex-col w-[14rem] h-[12rem] items-start ml-4 font-body">
              <div className="mt-[6rem] font-semibold text-lg">
                {currProfile?.name !== "" ? currProfile?.name : 
                <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Add Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <input id="name" value={addName} onChange={(e) => setName(e.target.value)} placeholder="First and Last Name"/>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={updateName}>Submit</Button>
                </CardFooter>
              </Card>
                }
              </div>
              <div className="text-sm font-light mb-2">
                {currProfile?.userName !== "" ? "@"+currProfile?.userName : null}
              </div>
              <button className="rounded bg-white border-black border-[0.75px] font-light py-1 px-2 text-xs">
                + Connect
              </button>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="flex flex-col bg-white w-[55rem] h-[30rem] ml-12 mt-8">
                <div className="font-body font-semibold text-lg ml-4 mt-4"> Posts</div>
              </div>
              <div className="flex flex-col bg-white w-[55rem] h-[30rem] ml-12 mt-8">
                <div className="font-body font-semibold text-lg ml-4 mt-4"> Projects</div>
              </div>
            </div>
            <div className="bg-white h-[45rem] w-[28rem] ml-8 mt-8">
              <div className="font-body font-semibold text-lg ml-4 mt-4"> Skills </div>
              <div className="grid grid-cols-3">
                <div className="flex flex-col justify-center items-center w-[8rem] h-[8rem] mt-4">
                  <div className="w-[6rem] h-[6rem] rounded-[8rem] bg-gray-400"></div>
                  <div className="font-light">Typescript</div>
                </div>
                <div className="flex flex-col justify-center items-center w-[8rem] h-[8rem mt-4">
                  <div className="w-[6rem] h-[6rem] rounded-[8rem] bg-gray-400"></div>
                  <div className="font-light">Typescript</div>
                </div>
                <div className="flex flex-col justify-center items-center w-[8rem] h-[8rem] mt-4">
                  <div className="w-[6rem] h-[6rem] rounded-[8rem] bg-gray-400"></div>
                  <div className="font-light">Typescript</div>
                </div>
                <div className="flex flex-col justify-center items-center w-[8rem] h-[8rem] mt-4">
                  <div className="w-[6rem] h-[6rem] rounded-[8rem] bg-gray-400"></div>
                  <div className="font-light">Typescript</div>
                </div>
                <div className="flex flex-col justify-center items-center w-[8rem] h-[8rem] mt-4">
                  <div className="w-[6rem] h-[6rem] rounded-[8rem] bg-gray-400"></div>
                  <div className="font-light">Typescript</div>
                </div>
                <div className="flex flex-col justify-center items-center w-[8rem] h-[8rem] mt-4">
                  <div className="w-[6rem] h-[6rem] rounded-[8rem] bg-gray-400"></div>
                  <div className="font-light">Typescript</div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
       </SignedIn>
    </>
    
  );
}