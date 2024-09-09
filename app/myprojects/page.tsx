"use client";
import Sidenavbar from "@/components/sidenavbar"
import BlackButton1 from "@/components/ui/BlackButton1"
import FgPostTemplate from "@/components/fgpostTemplate"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/lib/firebase"; // Import firestore
import { Loader } from "lucide-react";
import Header from "@/components/header";
import { SignedIn } from "@/components/signed-in";
import { getCurrentUser } from '@/services/profile';
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore imports
import { getProfile } from "@/services/profile";

export default function MyProfile() {
    const router = useRouter(); 
    const [posts, setPosts] = useState<any>([]);
    const [user, loading] = useAuthState(auth); 
    const [loadingPosts, setLoadingPosts] = useState(true); // State to track loading of posts
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            }
        }
    }, [loading, user, router]);

    useEffect(() => {
        fetchPosts();
    },[user]); 

    const fetchPosts = async () => {
        try {
            const currentUser = await getCurrentUser(user);
            
            if (currentUser) {
                const q = query(collection(firestore, "fg_post"), where("ownerId", "==", currentUser.id));
                const querySnapshot = await getDocs(q);
                const userPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(userPosts);
                console.log(posts)
            }
        } catch (error) {
            console.error("Error fetching posts: ", error);
        } finally {
            setLoadingPosts(false);
        }
    };

    const [profiles, setProfiles] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchProfiles = async () => {
            // Collect all user IDs from posts
            const userIds = new Set<string>();
            posts.forEach((post:any )=> post.interested.forEach((userId: string) => userIds.add(userId)));

            // Fetch profiles for all unique user IDs
            const profilesData = await Promise.all(Array.from(userIds).map(async userId => {
                const profile = await getProfile(userId);
                return { id: userId, name: profile.email}; // Adjust according to your profile structure
            }));

            // Map profiles to an object for quick lookup
            const profilesMap = profilesData.reduce((acc: { [key: string]: string }, profile) => {
                acc[profile.id] = profile.name;
                return acc;
            }, {});

            setProfiles(profilesMap);
        };

        fetchProfiles();
    }, [posts]);
    const test = () => {
        console.log(profiles)
        console.log(profiles[""])
    }
    return (
        <>
             {loading ? 
            <div className="flex justify-center items-center w-screen h-screen">
                <Loader className="animate-spin w-10 h-10"></Loader> 
            </div>
            
            : <></>}
            <SignedIn>
                <Header></Header>
                <div className="bg-[#f6f6f6] h-screen flex">
                    
                    <Sidenavbar/>
                    <div>
                        <p>My Projects</p>
                        <div>
                            {posts.length > 0 ? (
                                posts.map((post: any) => (
                                    <div key={post.id} className="post-item">
                                        <h3>{post.title}</h3> {/* Assuming each post has a title */}
                                        <p>{post.content}</p> {/* Assuming each post has content */}
                                        <h4>Interested Users:</h4>
                                        <ul>
                                            {post.interested && post.interested.length > 0 ? (
                                                post.interested.map((userId: any) => (
                                                    <li key={userId}>{profiles[userId]}</li> // Assuming user has a name field
                                                    
                                                ))
                                            ) : (
                                                <li>No users interested.</li>
                                            )}
                                        </ul>
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
    )
}