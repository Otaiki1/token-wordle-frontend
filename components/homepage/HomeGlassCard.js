import HomeCard from "./HomeCard";
import HomeTopButtons from "./HomeTopButtons";

export default function HomeGlassCard() {
  const stats = [
    {
      amt: 20.34,
      desc: "Available tokens",
    },
    {
      amt: 13.45,
      desc: "Staked tokens",
    },
    {
      amt: 4.65,
      desc: "Earned tokens",
    },
    {
      amt: 14,
      desc: "Winnings",
    },
  ];

  return (
    <div className="h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 w-[90%] mx-auto mt-8 py-12">
      <HomeTopButtons />
      <div className="my-4 flex justify-between px-16 mt-12">
        {stats.map((item, i) => (
          <HomeCard amount={item.amt} desc={item.desc} key={i} />
        ))}
      </div>

      <div className="mt-16">
        <img src="./images/LandingImage.png" className="block mx-auto" />
      </div>
      <div className="mt-16">
        <a className="btn mx-auto" href="./game">
          PLAY NOW
        </a>
      </div>
    </div>
  );
}
