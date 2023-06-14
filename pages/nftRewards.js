import Image from "next/image";
import Footer from "../components/Footer";
import MainNavbar from "../components/MainNavbar";
import Rewards from "../components/rewards.js"

const [userRewards, TopNFTs] = Rewards;
export default function nftRewards() {
  return (
    <>
      <MainNavbar />
      <main className="px-24 py-5">
        <div className="uppercase bg-white text-center text-xl py-3 px-16 inline-block font-semibold">
          nft rewards
        </div>
        <div className="mt-8">
            <p className="font-bold text-white">My NFTs</p>
            <div className="flex overflow-x-visible mt-5">
                {userRewards.map((img, i) => <Image src={img} key={i} className="mr-16 border border-white rounded-lg w-64" />)}
            </div>
        </div>
        <div className="mt-8">
            <p className="font-bold text-white">Top NFTs</p>
            <div className="flex overflow-x-visible mt-5">
                {TopNFTs.map((img, i) => <Image src={img} key={i} className="mr-16 border border-white rounded-lg w-64" />)}
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
