export default function ScPostTemplate({
    title = "Default Title",
    description = "Default Description",
    tags = "Default Tags" ,
    likes = 0,
    ownerId = "",
    imageThumbnail = "",
    video = "",
    skill = [],
    techStack = [],
    onClick
}: {
    title?: string;
    description?: string;
    tags?: string;
    likes?: number;
    ownerId?: string;
    imageThumbnail?: string,
    video?: string;
    skill?: Array<string>;
    techStack?: Array<string>;
    onClick?: () => void
}) {
    return (
        <div className="bg-white w-full p-4 rounded-lg" onClick={onClick}>
            <p className="font-semibold text-[24px]">{title}</p>
            <p className="font-medium text-[14px] text-[#595959]">{description}</p>
        </div>
    );
}