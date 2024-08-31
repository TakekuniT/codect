

export default function SignUp() {
    return (
        <div className="flex justify-center items-center h-screen bg-[#f6f6f6]">
            <div className="bg-white w-[30%] flex flex-col p-8 rounded-lg ">
                <p className="text-[24px] font-semibold mx-auto">Get Started</p>
                <p className="text-[14px] text-gray-500 mx-auto">Already have an account? Login</p>
                <div className="mt-10">
                    <p className="text-[14px]">Email</p>
                    <input className="border-black border-[1px] rounded-lg w-full px-4 py-1"/>

                </div>
                <div className="mt-2">
                    <p className="text-[14px]">Username</p>
                    <input className="border-black border-[1px] rounded-lg w-full px-4 py-1"/>

                </div>
                <div className="mt-2">
                    <p className="text-[14px]">Password</p>
                    <input className="border-black border-[1px] rounded-lg w-full px-4 py-1"/>

                </div>
                <p className="ml-auto mr-0 text-[12px] mt-2 text-gray-500">Forgot password?</p>
                <button className="bg-black text-white rounded-lg p-1 text-[16px] mt-6">Login</button>
                <div className="mt-6 flex items-center">
                    <hr className="flex-grow border-t border-gray-300" />
                    <div className="relative px-2">
                        <p className="text-[12px]">OR</p>
                    </div>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
                
                <button className="w-full border-[1px] border-black rounded-lg mt-6 p-2 text-[14px] font-semibold">Login with Google</button>
            </div>
            
        </div>
    )
}