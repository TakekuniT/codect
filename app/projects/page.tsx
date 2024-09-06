

import Sidenavbar from "@/components/sidenavbar"
import BlackButton1 from "@/components/ui/BlackButton1"
import FgPostTemplate from "@/components/fgpostTemplate"





export default function projects() {
    return (
        <div className="bg-[#f6f6f6] h-screen flex">
            
            <Sidenavbar/>
            <div className="p-10 w-1/2">
                <a href="createProjectPost">
                <BlackButton1 text="+ Create Project" />

                </a>
                
                <FgPostTemplate/>
               
                

            </div>
            <div className="w-1/2">

            </div>
            
        </div>
    )
}