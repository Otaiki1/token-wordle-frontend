import StakingHeader from "../components/StakingHeader";
import MainNavbar from "../components/MainNavbar";
import { useGameContext } from "../contexts";
import { useState } from "react";

export default function Withdrawal() {
  const { callWithdrawToken, address, userStake } = useGameContext();
  const [amount, setAmount] = useState();
  return (
    <>
      <MainNavbar />
      <div className="h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border-2 border-gray-100 w-[90%] px-10 py-5 mx-20 my-10  rounded-lg  lato">
        <StakingHeader />
        <hr className="mb-10" />
        <form action="" className="w-1/2 mx-auto mb-12">
          <div className="mt-5">
            <p className="font-bold">Amount transferable</p>
            <input
              value={amount}
              onChange={() => callWithdrawToken(amount)}
              type="text"
              className="w-full py-5 px-3 text-lg font-bold rounded-lg bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border-2 border-blue-400"
            />
            <p className="text-slate-600 text-sm">
              You will have <span>{userStake}</span> TLC remaining
            </p>
          </div>
          <div className="mt-8">
            <button className="btn block mx-auto text-center">Withdraw</button>
          </div>
        </form>
      </div>
    </>
  );
}
