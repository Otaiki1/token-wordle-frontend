import ProgressBar from "./ProgressBar";

export default function InfoCard({ cardDetails }) {
  return (
    <div className="w-96 h-[90%] py-5 px-3 bg-white rounded-md">
      <h1 className="uppercase font-bold">{cardDetails.name}</h1>
      <p className="mt-2 text-slate-500">#{cardDetails.id}</p>
      <p className="mt-5 text-slate-500">
        Price:{" "}
        <span className="text-black uppercase">{cardDetails.price} TLC</span>
      </p>
      <p className="mt-5 text-slate-500">
        Milestone:{" "}
        <span className="text-green-500">
          {cardDetails.milestone} correct words
        </span>
      </p>
      <div className="mt-5 flex jus">
        <p className="text-slate-500 mr-3">Progress: </p>
        <ProgressBar value={cardDetails.progress} maxValue={100} />
      </div>
      <div className="mt-5 mb-12">
        <h1 className="text-xl text-black font-bold">Trade NFT</h1>
        <p className="mt-2 text-slate-500">Recipient wallet</p>
        <input
          type="text"
          className="block w-full py-3 px-2 font-medium border-2 border-blue-500 rounded-lg"
        />
        <button className="bg-neutral-800 w-1/2 mt-12 rounded-md block mx-auto text-center px-8 py-4 text-white font-bold">
          Confirm
        </button>
      </div>
    </div>
  );
}
