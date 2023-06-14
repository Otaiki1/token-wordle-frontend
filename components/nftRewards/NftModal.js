import InfoCard from "./InfoCard";

const cardDetails = {
    name: "THEDARKMAN3241",
    id: 3241,
    price: 110,
    milestone: 10000,
    progress: 25,
}

export default function NftModal(){
    return(
        <>
            <div className="mx-auto bg-black w-[90%] border border-white rounded-md h-[80vh]">
                <div className="w-full mb-12">
                    <img src="./images/material-symbols_close-fullscreen.png" className="float-right mr-5 mt-2"/>
                </div>
                <div className="flex h-full">
                    <div className="w-[70%] h-[90%] p-5">
                        <img src="./images/Frame 112.png" alt="" className="w-full h-full"/>
                    </div>
                    <InfoCard cardDetails={cardDetails}/>
                </div>
                
            </div>
        </>
    )
}