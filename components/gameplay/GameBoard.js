import { useEffect, useState } from "react";
import GameScoreCard from "./GameScoreCard";
import InstructionModal from "./InstructionModal";
import Keyboard from "./Keyboard";
import WordBox from "./WordBox";
import { useGameContext } from "../../contexts";
import { useRouter } from "next/router";

export default function GameBoard() {
  const [wordArray, setWordArray] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {
    updateWordState,
    isStarted,
    initGame,
    startTimer,
    fetchUserWord,
    playedGame,
    gameEnded,
  } = useGameContext();

  const router = useRouter();

  const displayModal = () => {
    setShowModal(!showModal);
  };
  const getKeyboardInput = async (letter) => {
    console.log(wordArray);
    if (letter === "Enter") {
      //run checks instead
      //check array length is 5
      if (wordArray.length == 5) {
        //if true , then :
        //pass it to ctx
        const { modWordArray, isAllCorrect } = await updateWordState(wordArray);
        //which would return object of if all is true
        if (isAllCorrect) {
          setWordArray(modWordArray);
          // await playedGame(wordArray);
          alert("won, click submit to submit");
        } else {
          setWordArray(modWordArray);
        }
      }
    } else if (letter === "Del") {
      // remove last letter from current word box
      if (wordArray.length > 0) {
        let tempBox = [...wordArray];
        tempBox.pop();
        setWordArray(tempBox);
      }
    } else {
      // add letter to current word box
      if (!isStarted) {
        alert("Step 1 , game starts");
        await initGame();
        alert("Step 1 , fetching word...");
        await fetchUserWord();
        alert("Step3 , fetched word");
        await startTimer();
      }
      if (wordArray.length <= 5) {
        // console.log(letter);
        let tempBox = [...wordArray, { letter: letter }];
        setWordArray(tempBox);
      }
    }
  };

  const submitGame = async () => {
    if (wordArray.length == 5) {
      await playedGame(wordArray);
      alert(
        "Congratulations , you have been awarded tokens go see your balance"
      );
      router.push("/staking");
    } else {
      alert(
        "You cant submit till you fill all words, its best to test the correctness of your word with the enter key first befor submitting"
      );
    }
  };
  useEffect(() => {
    if (isStarted && gameEnded) {
      alert("game has ENDED");
      router.push("/home");
    }
  });
  return (
    <div className="h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter mt-10 backdrop-blur-lg bg-opacity-20 border border-gray-100 w-[90%] mx-auto mt-8 py-12 relative">
      {showModal && <InstructionModal clickHandler={displayModal} />}
      {!showModal && (
        <>
          <a href="" className="inline-block absolute top-0 left-[97%]">
            <img
              src="./images/mdi_close-circle.png"
              alt="cancel"
              className="mt-3"
            />
          </a>
          <GameScoreCard clickHandler={displayModal} />
          <div className="mt-5 flex w-[80%] mx-auto gap-12">
            <div className="w-full">
              <WordBox wordArray={wordArray} />
            </div>
          </div>
          <div className="mt-5">
            <Keyboard clickHandler={getKeyboardInput} />
          </div>
          <div className="mt-5">
            <button className="btn block mx-auto" onClick={() => submitGame()}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
