import { useState } from "react";
import { useStateContext } from "../contexts/AuthContext";

export default function MainNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const {connectWallet, address} = useStateContext()
  return (
    <nav className="bg-black w-full text-white md:px-32 px-3">
      <div className="flex justify-between items-center">
        <a className="block" href="./">
          <img src="./images/Logo.png" alt="" className="w-24" />
        </a>
        <div
          class="md:hidden block"
          id="burger"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className={showMenu ? "block" : "hidden md:flex w-full ml-64"}>
          <a href="./home" className="block px-8 py-4 hover:border">
            Home
          </a>
          <a href="./account" className="block px-8 py-4 hover:border">
            Account
          </a>
          <a href="" className="block px-8 py-4 hover:border">
            Scores
          </a>
          <a href="/staking" className="block px-8 py-4 hover:border">
            Stake
          </a>
          <button className="block px-8 border border-white ml-auto">
          {address ? `${address.slice(0,5)}...${address.slice(30, 40)}` : "Connect Wallet"}
          </button>
        </div>
      </div>
    </nav>
  );
}
