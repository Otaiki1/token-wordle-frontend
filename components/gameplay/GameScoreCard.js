import { useEffect } from "react";
import { useGameContext } from "../../contexts";

export default function GameScoreCard({ clickHandler }) {
  const { timerState, updateTimerState, time } = useGameContext();

  useEffect(() => {
    updateTimerState();
  }, [time]);
  return (
    <div className="bg-white w-[80%] mx-auto p-3 px-5 flex justify-between items-center">
      <div className="flex justify-between w-64 items-center">
        <h1 className="text-black text-4xl">Scores</h1>
        <h1 className="bg-[#3A3A3A] rounded-full px-3 text-white text-4xl w-32 py-2">
          0
        </h1>
      </div>
      <div className="item-start justify-self-start">
        {timerState && (
          <h1 className="text-[#ff0000] text-3xl">
            {timerState.minutes}:{timerState.seconds}
          </h1>
        )}
      </div>
      <div onClick={() => clickHandler()}>
        <img src="./images/medical-icon_i-information-us.png" />
      </div>
    </div>
  );
}
