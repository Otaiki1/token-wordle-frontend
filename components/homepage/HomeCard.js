export default function HomeCard({amount, desc, key}) {
  return (
    <div className="w-52 h-52 relative" key={key}>
      <img src="./images/curvyBg.png" alt="" className="w-full h-full" />
      <div className="absolute top-16 w-full">
        <h1 className="text-white text-center text-5xl font-semibold">{amount}</h1>
        <p className="text-white text-2xl mt-5 text-center">
            {desc}
        </p>
      </div>
    </div>
  );
}
