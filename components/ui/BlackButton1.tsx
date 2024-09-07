

export default function BlackButton1 ({text, onClick}: {text: string, onClick?:any}) {
    return (
        <div>
            <button onClick={onClick} className="text-white bg-black px-4 py-2 rounded-lg text-[12px]">{text}</button>
        </div>
    )
}