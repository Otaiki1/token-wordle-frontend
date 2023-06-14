import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  gameContract,
  gameabi,
  stakingContract,
  stakingabit,
  vrfdContract,
  vrfdabi,
  stakingTokens,
  stakingTokenabi,
} from "../constants";
import { useRouter } from "next/router";
import { useStateContext } from "./AuthContext";

import dotenv from "dotenv";
dotenv.config();

export const Gameplay = createContext();

export const GameplayProvider = (props) => {
  const router = useRouter();
  const { address } = useStateContext();
  console.log(address);
  const [userStake, setUserStake] = useState("");
  const [totalStake, setTotalStake] = useState("");
  const [userWordArray, setUserWordArray] = useState([]);
  const [time, setTime] = useState(300);
  const [timerState, setTimerState] = useState({ minutes: 0, seconds: 0 });
  const [isStarted, setIsStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [userBalance, setUserBalance] = useState(false);
  const [hasRolledDie, setHasRolledDie] = useState(false);

  async function connectToNetwork() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      return provider;
    } else {
      throw new Error("Please install MetaMask to use this application.");
    }
  }

  async function callStakeToken(value) {
    try {
      const provider = await connectToNetwork();

      // Get the signer (connected account)
      const signer = provider.getSigner();

      const tokenContract = new ethers.Contract(
        stakingTokens,
        stakingTokenabi,
        signer
      );

      // Create a contract instance
      const amount = Number(value);
      const contract = new ethers.Contract(
        stakingContract,
        stakingabit,
        signer
      );
      await tokenContract.approve(stakingContract, amount);
      const tx = await contract.stake(amount);
      await tx.wait(); // Await the transaction to be mined
      router.push("/game");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  async function callWithdrawToken(value) {
    try {
      const provider = await connectToNetwork();

      // Get the signer (connected account)
      const signer = provider.getSigner();

      // Create a contract instance
      const amount = ethers.utils.parseEther(value.toString());
      const contract = new ethers.Contract(
        stakingContract,
        stakingabit,
        signer
      );
      const tx = await contract.withdrawStaked(amount);
      await tx.wait(); // Await the transaction to be mined
      router.push("/game");
    } catch (error) {
      alert(error.message);
    }
  }

  async function callGetStakedToken() {
    try {
      const provider = await connectToNetwork();

      // Get the signer (connected account)
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(
        stakingContract,
        stakingabit,
        signer
      );
      const tx = await contract.getStaked(address);
      setUserStake(tx.toString()); // Convert the BigNumber to a string
    } catch (error) {
      // alert(error.message);
    }
  }
  async function callGetUserBalance() {
    try {
      const provider = await connectToNetwork();

      // Get the signer (connected account)
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(
        stakingTokens,
        stakingTokenabi,
        signer
      );
      const tx = await contract.balanceOf(address);
      setUserBalance(tx.toString()); // Convert the BigNumber to a string
    } catch (error) {
      // alert(error.message);
    }
  }

  async function callTotalStakedToken() {
    try {
      const provider = await connectToNetwork();

      // Get the signer (connected account)
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(
        stakingContract,
        stakingabit,
        signer
      );
      const tx = await contract.s_totalSupply();
      setTotalStake(tx.toString()); // Convert the BigNumber to a string
    } catch (error) {
      alert(error.message);
    }
  }

  //gamePlay functionalities

  async function rollYourDie() {
    try {
      const provider = await connectToNetwork();

      // Get the signer (connected account)
      const signer = provider.getSigner();

      // Create a contract instance
      const VrfdContract = new ethers.Contract(vrfdContract, vrfdabi, signer);
      if (!hasRolledDie) {
        const tx = await VrfdContract.rollDice(address);
        await tx.wait(); // Await the transaction to be mined
        // Wait for 5 minutes
        await new Promise((resolve) => setTimeout(resolve, 300000));
        alert("Your die has rolled successfully, you can proceed to game play");
        setHasRolledDie(true);
        router.push("/game");
      } else {
        alert("you have rolled already");
        if (hasRolledDie) {
          router.push("/game");
        }
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  async function fetchUserWord() {
    try {
      const provider = await connectToNetwork();

      // Get the signer (connected account)
      const signer = provider.getSigner();

      // Create a contract instance
      const VrfdContract = new ethers.Contract(vrfdContract, vrfdabi, signer);
      const GameContract = new ethers.Contract(gameContract, gameabi, signer);
      // if (!hasRolledDie) {
      //   const tx = await VrfdContract.rollDice(address);
      //   await tx.wait(); // Await the transaction to be mined
      //   alert("WAIT FOR 5 MINUTES");
      //   // Wait for 5 minutes
      //   await new Promise((resolve) => setTimeout(resolve, 300000));
      //   alert("wait ended , game can begin");
      // }

      const playersWord = await VrfdContract.word(address);
      console.log("Players Word is ____", playersWord);
      setUserWordArray(playersWord);
      //begin game play with game contract
      await GameContract.startGame(playersWord);

      // router.push("/game");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  const startTimer = () => {
    let timeC = 300;
    const interval = setInterval(() => {
      if (timeC > 0) {
        setTime((prevTime) => prevTime - 1);
        timeC -= 1;
      } else {
        setGameEnded(true);
        return;
      }
      console.log(timeC);
    }, 1000);

    return () => clearInterval(interval); // Clear the interval when game ends or component unmounts
  };

  const updateTimerState = () => {
    setTimerState({ minutes: Math.floor(time / 60), seconds: time % 60 });
  };

  const encryptLetter = (letter) => {
    const encodedLetter = ethers.utils.toUtf8Bytes(letter);
    const secretKey = ethers.utils.formatBytes32String("t0k3nW0rd13");
    const encodedSecretKey = ethers.utils.arrayify(secretKey);
    const saltedLetter = ethers.utils.concat([encodedLetter, encodedSecretKey]);
    const encryptedLetter = ethers.utils.keccak256(saltedLetter);
    return encryptedLetter;
  };

  const updateWordState = (wordArray) => {
    let isAllCorrect = true;
    for (let i = 0; i < wordArray.length; i++) {
      const letter = wordArray[i].letter;
      const encryptedLetter = encryptLetter(letter);
      if (userWordArray.includes(encryptedLetter)) {
        wordArray[i].status = "wrong";
      }
      if (userWordArray[i] === encryptedLetter) {
        wordArray[i].status = "right";
      } else {
        isAllCorrect = false;
      }
    }

    return { modWordArray: wordArray, isAllCorrect: isAllCorrect };
  };

  async function playedGame(userArray) {
    try {
      const provider = await connectToNetwork();

      // Get the signer (connected account)
      const signer = provider.getSigner();

      const GameContract = new ethers.Contract(gameContract, gameabi, signer);
      const tx = await GameContract.playedGame(userWordArray, userArray);
      const txReceipt = await tx.wait(1); // Await the transaction to be mined
      console.log(txReceipt);
      const isWon = txReceipt.events[txReceipt.events.length - 1].args.isWon;

      if (isWon) console.log("COnfirmed Win");
      if (!isWon) console.log("Win not confirmed");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  const initGame = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    callGetStakedToken();
    callTotalStakedToken();
    callGetUserBalance();
  }, [address]);

  return (
    <Gameplay.Provider
      value={{
        callStakeToken,
        callWithdrawToken,
        userStake,
        totalStake,
        userWordArray,
        fetchUserWord,
        timerState,
        startTimer,
        updateTimerState,
        updateWordState,
        isStarted,
        initGame,
        playedGame,
        gameEnded,
        time,
        callGetUserBalance,
        userBalance,
        hasRolledDie,
        rollYourDie,
      }}
    >
      {props.children}
    </Gameplay.Provider>
  );
};

export const useGameContext = () => {
  const contextValue = useContext(Gameplay);
  if (contextValue === null) {
    throw new Error("useErrandContext must be used within a PolyverseProvider");
  }
  return contextValue;
};
