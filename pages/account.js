import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
// import StakingHeader from "../components/StakingHeader";
import AccountHeader from "../components/AccountHeader";

const inter = Inter({ subsets: ["latin"] });

const Transactions = [
  {
    id: 1,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    date: "2/18/2023 11:22",
    gain: "1088.67TLC",
  },
  {
    id: 2,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    date: "2/18/2023 11:22",
    gain: "1088.67TLC",
  },
  {
    id: 3,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    date: "2/18/2023 11:22",
    gain: "1088.67TLC",
  },
  {
    id: 4,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    date: "2/18/2023 11:22",
    gain: "1088.67TLC",
  },
  {
    id: 5,
    Wallet: "0XCFGG56889JBNKIYTRDJKU7",
    date: "2/18/2023 11:22",
    gain: "1088.67TLC",
  },
];

export default function () {
  return (
    <>
      <div className="px-10 py-5 mx-20 my-5 border-2 rounded-lg lato">
        <AccountHeader />

        <ul className="flex justify-between font-bold px-20 ">
          <li> Wallet</li>
          <li className="pl-20"> Date</li>
          <li> Balance</li>
        </ul>

        {Transactions.map((transaction) => {
          const { id, date, gain, Wallet } = transaction;
          return (
            <ul className="flex justify-between pr-20 pl-5  bg-white py-5 my-5 rounded-xl ">
              <li>
                {id}. {Wallet}
              </li>
              <li> {date} </li>
              <li> {gain} </li>
            </ul>
          );
        })}
      </div>
    </>
  );
}
