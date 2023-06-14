export default function LetterBox({ letter, status }) {
  if (status === "right") {
    return (
      <div className="w-20 h-20 flex justify-center items-center bg-green-400 text-4xl p-5 rounded-xl uppercase font-bold text-white">
        {letter}
      </div>
    );
  } else if (status === "wrong") {
    return (
      <div className="w-20 h-20 flex justify-center items-center bg-yellow-600 text-4xl p-5 rounded-xl uppercase font-bold text-white">
        {letter}
      </div>
    );
  } else {
    return (
      <div className="w-20 h-20 flex justify-center items-center bg-slate-100 text-4xl p-5 rounded-xl uppercase font-bold">
        {letter}
      </div>
    );
  }
}
