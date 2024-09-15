import { useState, useEffect } from "react";
import {Sheet,SheetClose,SheetContent,SheetDescription,SheetFooter,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Menu } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Mail } from 'lucide-react';
import BlackButton1 from "@/components/ui/BlackButton1";

export default function LandingPage () {
    const [burgerVisible, setBurgerVisibility] = useState(false);
    const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
    const toggleBurgerButton = () => {
        setBurgerVisibility(!burgerVisible);
    };

    useEffect (() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
              setDirection("vertical"); // Mobile screen
            } else {
              setDirection("horizontal"); // Laptop screen
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    })
    return (
    <div>
        <div className="relative w-full max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 lg:max-w-[calc(100%-68px)] md:max-w-[calc(100%-38px)]">
            <div className="p-4 py-2 flex items-center justify-between text-center">
                <p className="text-[48px]">Codect</p>
                <div className="hidden md:block">
                    <a className="font-[1.2em] text-[#18216d] transition-colors duration-200 ease-in m-2 md:m-5 cursor-pointer">
                        <span className="cursor-pointer transition-all duration-300 ease-in-out hover:text-[#ff825c] focus:text-[#ff825c] active:text-[#ff825c] hover:underline decoration-wavy underline-offset-4">About</span>
                    </a>
                    <a className="font-[1.2em] text-[#18216d] transition-colors duration-200 ease-in m-2 md:m-5 cursor-pointer">
                        <span className="cursor-pointer transition-all duration-300 ease-in-out hover:text-[#ff825c] focus:text-[#ff825c] active:text-[#ff825c] hover:underline decoration-wavy underline-offset-4">Product</span>
                    </a>
                    <a className="font-[1.2em] text-[#18216d] transition-colors duration-200 ease-in m-2 md:m-5 cursor-pointer">
                        <span className="cursor-pointer transition-all duration-300 ease-in-out hover:text-[#ff825c] focus:text-[#ff825c] active:text-[#ff825c] hover:underline decoration-wavy underline-offset-4">Product</span>
                    </a>
                    <a href="/signup" className="font-[1.2em] text-[#18216d] bg-black transition-colors duration-200 ease-in m-2 md:m-5 cursor-pointer px-4  py-2 rounded-lg">
                        <span className="cursor-pointer transition-all duration-300 ease-in-out hover:text-[#ff825c] focus:text-[#ff825c] active:text-[#ff825c] hover:underline decoration-wavy underline-offset-4 text-white">Sign Up</span>
                    </a>

                </div>
                <div onClick={toggleBurgerButton} className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Menu />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Name
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Username
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                            </div>
                            <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                </div>
                
                

            </div>
            <div className="h-screen lg:flex  ">
                <div className="lg:flex-1 order-1 lg:order-2 flex justify-center">
                    <img src="landing-page-icon.svg"/>

                </div>
                <div className="lg:flex-1 lg:order-1 order-2 flex flex-col justify-center  ">
                    <p className="text-[48px] font-bold">Level Up Your Developer Network</p>
                    <p className="text-[24px]">Connect with top developers and bring your projects to life</p>
                    <div className="flex gap-8 mt-10">
                        <BlackButton1 text="Learn More"/>
                        <BlackButton1 text="Get Started"/>

                    </div>

                </div>
                

            </div>
            <div className=" h-screen flex flex-col justify-center items-center">
                <p className="text-[48px] font-bold">Build your Team with Ease</p>
                <p className="max-w-[50%] text-[24px] ">Codet helps you quickly find and connect with talented developers for your projects.
                    Whether you're starting something new or need a collaborator, our platform makes
                    it easy to discover the right people and get your team together. 
                </p>
                <BlackButton1 text="Get started"/>

            </div>
            <div className="h-screen flex justify-center items-center gap-8">
                <div className="flex-1">
                    <img src="landing-page-icon2.svg"/>

                </div>
                <div className="flex-1 flex flex-col gap-8 ">
                    <div className="border border-black p-4 rounded-lg">
                        <p className="font-bold text-[24px]">Find your ideal Developers</p>
                        <p>Create project postings that will connect you with developers 
                            who have the skills and expertise that fit your project needs.
                        </p>

                    </div>
                    <div className="border border-black p-4 rounded-lg">
                        <p className="font-bold text-[24px]">Boost your Resume</p>
                        <p>Find projects that fits your passions and easily show your 
                            interests to project leads
                        </p>

                    </div>
                    <div className="border border-black p-4 rounded-lg">
                        <p className="font-bold text-[24px]">Showcase Your Achievements</p>
                        <p>Create posts to attrach and engage with leaders and teammates 
                            in the industry
                        </p>

                    </div>

                </div>

            </div>
            <div className=" h-screen flex flex-col justify-center items-center w-full">
                <p className="text-[48px] font-bold">Our Team</p>
                <div className="flex w-full h-[300px] justify-center items-center">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img className="bg-gray-300 h-[200px] w-[200px] rounded-full"/>
                        <p className=" font-bold text-[24px] mt-4">Samantha Pang</p>
                        <div className="flex gap-4">
                            <Linkedin/>
                            <Mail/>
                        </div>

                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img className="bg-gray-300 h-[200px] w-[200px] rounded-full"/>
                        <p className=" font-bold text-[24px] mt-4">Samantha Pang</p>
                        <div className="flex gap-4">
                            <Linkedin/>
                            <Mail/>
                        </div>

                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img className="bg-gray-300 h-[200px] w-[200px] rounded-full"/>
                        <p className=" font-bold text-[24px] mt-4">Samantha Pang</p>
                        <div className="flex gap-4">
                            <Linkedin/>
                            <Mail/>
                        </div>

                    </div>

                </div>
                
             

            </div>
            <div className=" h-screen flex justify-center items-center">
                <div className="flex-1 p-10">
                    <p className="text-[48px] font-bold">Contact Us</p>
                    <p >Have questions or feedback? Feel free to reach out with any inquiries or comments.
                        Your input is important to us, and we're committed to providing the support
                        you need. 
                    </p>
                </div>
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-[14px]">Name</p>
                        <Input placeholder="Name" />

                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <p className="text-[14px]">Email</p>
                        <Input placeholder="Name" />

                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[14px]">Message</p>
                        <Textarea placeholder="Message" />

                    </div>
                    <div className="flex justify-end">
                        <BlackButton1 text="Submit"/>

                    </div>
                    
                    

                </div>
                
                

            </div>

            

            

                   

            
            
           
        </div>
        <div className="bg-gray-200 flex justify-between items-center py-8 px-12">
            <p className="font-bold text-[36px]">Codet</p>
            <div className="flex justify-center gap-4 py-4">
                
                <div>Linkedin</div>
                <div>Instagram</div>
                <div>Twitter</div>
                <div>Youtube</div>
            </div>
        </div>
    </div>
    )
}


