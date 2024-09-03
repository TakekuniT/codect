import Sidenavbar from "@/components/sidenavbar"
import BlackButton1 from "@/components/ui/BlackButton1"

export default function projects() {
    return (
        <div className="bg-[#f6f6f6] h-screen flex">
            
            <Sidenavbar/>
            <div>
                <BlackButton1 text="helloooo"/>
                <button className="bg-black text-white">hi</button>
                

            </div>
            
        </div>
    )
}