

export default function BlackButton1 ({text}: {text: string}) {
    return (
        <div className="bg-black">
            <button className="text-[55px] bg-yellow-500">{text}</button>
        </div>
    )
}