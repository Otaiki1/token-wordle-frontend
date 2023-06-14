import LetterBox from "./LetterBox";

export default function InstructionModal({ clickHandler }) {
  return (
    <div className="w-[60%] mx-auto h-[80vh] rounded-lg bg-black py-3">
      <div className="flex justify-between">
        <h1 className="text-3xl text-center text-white w-full">
          What you should know
        </h1>
        <img
          src="./images/material-symbols_close-fullscreen.png"
          alt=""
          className="block mr-3"
          onClick={() => clickHandler()}
        />
      </div>

      <p className="mt-3 w-[40%] text-center text-white mx-auto">
        Try guessing the correct word in six (6) tries. After each try, the
        tile changes color to show you how close you were to the correct word
        You get 20 points for each correct word and spot
      </p>
      <h2 className="mt-3 text-2xl text-center text-white"> See this!</h2>
      <div className="mt-3 flex w-[40%] mx-auto justify-between">
        <LetterBox letter={"w"} />
        <LetterBox letter={"o"} />
        <LetterBox letter={"r"} correct={true} />
        <LetterBox letter={"d"} />
        <LetterBox letter={"s"} />
      </div>
      <p className="mt-2 text-2xl text-center text-white">
        Letter R is correct and in the correct spot
      </p>
      <div className="mt-3 flex w-[40%] mx-auto justify-between">
        <LetterBox letter={"r"} />
        <LetterBox letter={"a"} />
        <LetterBox letter={"i"} />
        <LetterBox letter={"n"} />
        <LetterBox letter={"y"} wrong={true} />
      </div>
      <p className="mt-2 text-2xl text-center text-white">
        Letter Y is correct and in the wrong spot
      </p>
      <div className="mt-3 flex w-[40%] mx-auto justify-between">
        <LetterBox letter={"s"} />
        <LetterBox letter={"k"} />
        <LetterBox letter={"i"} />
        <LetterBox letter={"p"} />
        <LetterBox letter={"s"} />
      </div>
      <p className="mt-2 text-2xl text-center text-white">
        No letter is in correct or in the right spot
      </p>
    </div>
  );
}
