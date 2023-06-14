import LetterBox from "./LetterBox";

export default function GameEnd({ clickHandler, score, timeBonus, tokensEarned }) {
  return (
    <div className="w-[60%] mx-auto h-[60vh] rounded-lg bg-black py-3">
      <div className="flex justify-between">
        <h1 className="text-3xl text-center text-white w-full">
          How you did!
        </h1>
        <img
          src="./images/material-symbols_close-fullscreen.png"
          alt=""
          className="block mr-3"
          onClick={() => clickHandler()}
        />
      </div>

      <div className="mt-24 w-full mx-auto">
      <div className="flex justify-between w-1/2 items-center mx-auto my-8">
        <h1 className="text-white text-3xl">Scores</h1>
        <h1 className="bg-white rounded-full px-3 text-black text-2xl w-48 text-center py-2">
          {score}
        </h1>
      </div>
      <div className="flex justify-between w-1/2 items-center mx-auto my-8">
        <h1 className="text-white text-3xl">Time bonus</h1>
        <h1 className="bg-white rounded-full px-3 text-black text-2xl w-48 text-center py-2">
          {timeBonus}TLC
        </h1>
      </div>
      <div className="flex justify-between w-1/2 items-center mx-auto my-8">
        <h1 className="text-white text-3xl">Tokens earned:</h1>
        <h1 className="bg-white rounded-full px-3 text-black text-2xl w-48 text-center py-2">
          {tokensEarned}TLC
        </h1>
      </div>
      <div className="mt-8">
        <button className="bg-slate-100 px-12 py-3 block mx-auto rounded-lg text-lg font-bold">NEXT</button>
      </div>
      </div>
    </div>
  );
}
