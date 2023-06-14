import Footer from "../components/Footer";
import MainNavbar from "../components/MainNavbar";

export default function referral(){
    return(
        <>
        <MainNavbar />
        <div className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 w-[90%] mx-auto">
            <div className="w-full bg-black h-48 py-8">
                <h1 className="text-center text-white text-2xl">Share your unique referral link to invite your friends to play the game</h1>
                <p className="text-center mt-5 text-white">You will earn [X] tokens for every friend you refer to the game. <img src="./images/ph_question.png" alt="" className="inline"/> </p>
                <div className="border-2 border-white rounded-sm p-3 w-1/2 mx-auto flex justify-between">
                    <p className="text-white">Tokenwordle.com/invite/u/1ade532</p>
                    <p className="text-white">| copy</p>
                </div>
            </div>
            <div className="px-44 py-16 flex">
                <div className="pt-12 space-y-5">
                    <p>Share your referral link with your friends. When they sign up using your referral link, you will earn tokens.</p>
                    <div className="flex justify-between w-full">
                        <img src="./images/Frame 101.png" alt="" />
                        <img src="./images/Frame 102.png" alt="" />
                        <img src="./images/Frame 100.png" alt="" />
                        <img src="./images/Frame 98.png" alt="" />
                        <img src="./images/Frame 99.png" alt="" />
                    </div>
                    <hr />
                    <p><img src="./images/ph_question.png" alt="" className="inline m-3"/>Referrals must be new players. Checks would be made before rewards distribution</p>
                </div>
                <div className="w-full">
                <div className="bg-white rounded-md py-12 px-5 space-y-4 w-[90%] ml-auto float-right h-auto">
                    <p className="text-gray-600">Level 2</p>
                    <p className="text-2xl font-bold">30 Invites</p>
                    <p className="text-gray-600">Earnings</p>
                    <p className="text-2xl font-bold">30000 TLC Token</p>
                    <p className="text-gray-600">Total TLC Earned</p>
                    <p className="text-2xl font-bold">90000 TLC Token</p>
                </div>
                </div>
                
            </div>
        </div>
        <Footer />
        </>
        
    )
}