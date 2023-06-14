import Link from "next/link";

export default function StakingHeader() {
  return (
    <>
      <div className="flex mb-5 justify-between items-center font-semibold">
        <div className="px-10 py-5 w-1/4 text-center bg-blue-400 cursor-pointer">
          <h1> Staking Amount</h1>
        </div>
        <div className="px-10 py-5 w-1/4 text-center bg-white cursor-pointer">
          <h1>Staked Assets</h1>
        </div>
        <Link href="/withdrawal" className="px-10 py-5 w-1/4 text-center bg-white cursor-pointer">
          <h1>Withdrawal</h1>
        </Link>
      </div>
      <hr className="mb-3" />
    </>
  );
}
