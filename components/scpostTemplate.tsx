import TagComponent from "@/components/TagComponent";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/profile";

export default function ScPostTemplate({
    title = "Default Title",
    description = "Default Description",
    tags = "Default Tags",
    likes = 0,
    ownerId = "",
    imageThumbnail = "",
    video = "",
    skill = [],
    techStack = [],
    onClick,
    onLikeClick, 
}: {
    title?: string;
    description?: string;
    tags?: string;
    likes?: number;
    ownerId?: string;
    imageThumbnail?: string;
    video?: string;
    skill?: Array<string>;
    techStack?: Array<string>;
    onClick?: () => void;
    onLikeClick?: () => void; 
}) {
    const [ownerName, setOwnerName] = useState<string>("");

    useEffect(() => {
        async function fetchOwnerProfile() {
            if (ownerId) {
                try {
                    const profile = await getProfile(ownerId);
                    setOwnerName(profile.userName || "Unknown User");
                } catch (error) {
                    console.error("Failed to fetch profile:", error);
                }
            }
        }

        fetchOwnerProfile();
    }, [ownerId]);

    return (
        <div className="bg-white w-full p-4 rounded-lg shadow-md" onClick={onClick}>
            <p className="font-semibold text-[24px]">{title}</p>
            <p className="font-medium text-[14px] text-[#595959]">{description}</p>
            
          
            <p className="font-medium text-[12px] text-[#595959] mt-2">Posted by: {ownerName}</p>

            {skill.length > 0 && (
                <TagComponent
                    label="Skills"
                    list={skill}
                />
            )}

            {techStack.length > 0 && (
                <TagComponent
                    label="Tech Stack"
                    list={techStack}
                />
            )}

            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent the onClick event from firing
                    onLikeClick && onLikeClick(); // Call the like function if provided
                }}
                className="mt-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-md"
            >
                Like ({likes})
            </button>
        </div>
    );
}
