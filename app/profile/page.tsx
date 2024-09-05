"use client";
import Sidenavbar from "@/components/sidenavbar";

export default function Profile () {
 
    return (
    <>
       <div className="bg-[#f6f6f6] h-[400vh] flex">
       <Sidenavbar/>
        <div className="flex flex-col relative">
          <div className="ml-12 bg-pink-300 w-[55rem] h-[12rem] mt-8"/>
          <img className="h-[10rem] w-[10rem] bg-slate-400 left-16 border-white rounded-[5rem] border-[2.5px] absolute top-[9rem]"/>
          <div className="bg-white w-[55rem] h-[14rem] ml-12">
            <div className="flex flex-col w-[14rem] h-[12rem] items-start ml-4 font-body">
              <div className="mt-[6rem] font-semibold text-lg">
                Name Goes Here
              </div>
              <div className="text-sm font-light mb-2">
                @username
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
    </>
    
  );
}