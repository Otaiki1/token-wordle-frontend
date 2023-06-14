import { useState } from "react";
import { useGameContext } from "../../contexts";

export default function HomeTopButtons() {
  const [countDown, setCountDown] = useState();
  const { rollYourDie, hasRolledDie } = useGameContext();

  const makeWordRequest = async () => {
    if (!hasRolledDie) {
      setCountDown(300);
      beginCountdown();
      await rollYourDie();
    }

    alert("already requested");
  };

  const beginCountdown = () => {
    // setInterval(() => {
    //   beginCountdownCheck();
    // }, 1000);
  };

  // const beginCountdownCheck = () => {
  //   if (countDown == 0) {
  //     return;
  //   }
  //   setCountDown(countDown - 1);
  // };
  return (
    <div className="px-8 flex justify-between">
      <a
        href="./leaderboard"
        className="block w-64 py-3 bg-slate-50 text-2xl text-center"
      >
        LEADERBOARD
      </a>
      <a
        href="./nftRewards"
        className="block w-64 py-3 bg-slate-50 text-2xl text-center"
      >
        NFT REWARDS
      </a>
      <a
        href="./staking"
        className="block w-64 py-3 bg-slate-50 text-2xl text-center"
      >
        STAKING
      </a>
      <button
        onClick={() => makeWordRequest()}
        className="block w-64 py-3 bg-slate-50 text-2xl text-center"
      >
        {hasRolledDie ? countDown : "REQUEST WORD"}
      </button>
    </div>
  );
}
