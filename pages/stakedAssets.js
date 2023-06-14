import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StakingHeader from "../components/StakingHeader";

const inter = Inter({ subsets: ["latin"] });

const Transactions = [
  {
    id: 1,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    Staked_Amount: "907.67TLC",
    Increase: "26%",
    gain: "1088.67TLC",
  },
  {
    id: 2,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    Staked_Amount: "907.67TLC",
    Increase: "26%",
    gain: "1088.67TLC",
  },
  {
    id: 3,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    Staked_Amount: "907.67TLC",
    Increase: "26%",
    gain: "1088.67TLC",
  },
  {
    id: 4,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    Staked_Amount: "907.67TLC",
    Increase: "26%",
    gain: "1088.67TLC",
  },
  {
    id: 5,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    Staked_Amount: "907.67TLC",
    Increase: "26%",
    gain: "1088.67TLC",
  },
];

export default function StakedAssets() {
  return (
    <>
      <div className="px-10 py-5 mx-20 my-5 border-2 rounded-lg lato">
        <StakingHeader />

        <ul className="flex justify-around font-bold ">
          <li> Wallet</li>
          <li className="pl-20"> Staked Amount</li>
          <li> % Increase</li>
          <li> Gain</li>
        </ul>

        {Transactions.map((transaction) => {
          const { id, Increase, gain, Wallet, Staked_Amount } = transaction;
          return (
            <ul className="flex justify-between pr-20 pl-5  bg-white py-5 my-5 rounded-xl ">
              <li>
                {id}. {Wallet}
              </li>
              <li> {Staked_Amount} </li>
              <li> {Increase} </li>
              <li> {gain} </li>
            </ul>
          );
        })}
      </div>
    </>
  );
}
