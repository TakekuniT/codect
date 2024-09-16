"use client";
import Sidenavbar from "@/components/sidenavbar";
import Header from "@/components/header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { SignedIn } from "@/components/signed-in";
import BlackButton1 from "@/components/ui/BlackButton1";
import ScPostTemplate from "@/components/scpostTemplate";
import { getCurrentUser } from "@/services/profile";
import { doc, updateDoc, arrayUnion, collection, query, getDocs, increment } from "firebase/firestore"; 
import { firestore } from "@/lib/firebase"; 
import { getAllSCPosts } from "@/services/sc_post";
import TagComponent from "@/components/TagComponent";
import React from "react";
import { SCPost } from "@/types/post";

export default function Home() {
    const router = useRouter(); 
    const [posts, setPosts] = useState<SCPost[]>([]); // Use SCPost[] type
    const [loadingPosts, setLoadingPosts] = useState(true); 
    const [currentPost, setCurrentPost] = useState<SCPost | null>(null); // Type currentPost as SCPost or null

    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            }
        }
    }, [loading, user, router]);

    useEffect(() => {
        fetchPosts(); 
        console.log(posts); 
    }, [user]);

    const fetchPosts = async () => {
        try {
            const currentUser = await getCurrentUser(user);
            if (currentUser) {
                const q = query(collection(firestore, "sc_post"));
                const querySnapshot = await getDocs(q);
                const userPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SCPost)); // Type the posts
                setPosts(userPosts);
                console.log(posts);
            }
        } catch (error) {
            console.error("Error fetching posts: ", error);
        } finally {
            setLoadingPosts(false);
        }
    };

    // Function to handle like button click
    const likePost = async (postId: string) => {
        try {
            const postRef = doc(firestore, "sc_post", postId);
            await updateDoc(postRef, {
                likes: increment(1) // Increment the likes field by 1
            });

            // Update the local state to reflect the new likes count
            setPosts(posts.map(post => 
                post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
            ));
        } catch (error) {
            console.error("Error liking post: ", error);
        }
    };

    const handlePostClick = (post: SCPost) => {
        console.log(post);
        console.log("here here");
        setCurrentPost(post);
    };

    return (
        <>
            {loading ? 
            <div className="flex justify-center items-center w-screen h-screen">
                <Loader className="animate-spin w-10 h-10"></Loader> 
            </div>
            : <></>}
            <SignedIn>
                <Header />
                <div className="bg-[#f6f6f6] h-screen flex">
                    <Sidenavbar />
                    <div className="p-10 w-1/2">
                        <a href="createPost">
                            <BlackButton1 text="+ Create Post" />
                        </a>
                        <div className="flex flex-col gap-2 mt-4">
                            {posts.length > 0 ? (
                                posts.map((post: SCPost, index: number) => ( 
                                    <div key={index} > 
                                        <ScPostTemplate 
                                            title={post.title} 
                                            description={post.description} 
                                            likes={post.likes} 
                                            ownerId={post.ownerId} 
                                            imageThumbnail={post.imageThumbnail} 
                                            video={post.video} 
                                            skill={post.skill} 
                                            techStack={post.techStack} 
                                            onClick={() => handlePostClick(post)}
                                            onLikeClick={() => likePost(post.id)}
                                        />

                                        

                                    </div>
                                ))
                            ) : (
                                <p>No posts found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </SignedIn>
        </>
    );
}
