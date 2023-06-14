import Footer from "../components/Footer";
import MainNavbar from "../components/MainNavbar";
const leaderboardArr = [
  {
    address: "0XCFGG56889JBNKIYTRDJKU7",
    wins: 89,
    words: 90,
  },
  {
    address: "0XCFGG56889JBNKIYTRDJKU7",
    wins: 89,
    words: 90,
  },
  {
    address: "0XCFGG56889JBNKIYTRDJKU7",
    wins: 89,
    words: 90,
  },
  {
    address: "0XCFGG56889JBNKIYTRDJKU7",
    wins: 89,
    words: 90,
  },
  {
    address: "0XCFGG56889JBNKIYTRDJKU7",
    wins: 89,
    words: 90,
  },
  {
    address: "0XCFGG56889JBNKIYTRDJKU7",
    wins: 89,
    words: 90,
  },
];
export default function leaderboard() {
  return (
    <>
      <MainNavbar />
      <main className="px-24 py-5">
        <div className="uppercase bg-white text-center text-xl py-3 px-16 inline-block font-semibold">
          Leaderboard
        </div>
        <ol>
          {leaderboardArr.map((item, i) => (
            <li
              key={i}
              className="bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 flex justify-between p-5 mt-5 border border-white rounded-lg pr-16"
            >
              <p className="font-bold">
                {i + 1}. {item.address}
              </p>
              <p className="font-bold">{item.wins} WINS</p>
              <p className="font-bold">{item.words} Words</p>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </>
  );
}
