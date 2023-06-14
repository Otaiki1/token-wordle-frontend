import { useStateContext } from "../../contexts/AuthContext";
import { useStepperContext } from "../../contexts/StepperContext";

export default function Details() {
  const { userData, setUserData } = useStepperContext();
  const { setFirstName,setLastName,firstName,lastName} = useStateContext()

  return (
    <div className="w-[70%] mx-auto mt-0">
    <h1 className="text-center font-medium text-5xl">Tell us about you</h1>
    <p className="w-[60%] text-center mx-auto mt-4">
      This information will used as your displayed name for leaderboard
     </p>
    <div className="flex flex-col w-[60%] mx-auto mt-8">
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex rounded border-2 border-black">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            name="firstname"
            placeholder="First Name"
            className="w-full p-1 px-2 form-input 
            block leading-none focus:outline-none placeholder-black/50 
            [ transition-colors duration-200 ] 
            [ py-3 md:py-4 md:pr-4 lg:py-4] 
            [ bg-white/20 focus:bg-b/25 ] 
            [ text-[#333] focus:text-white text-xl ]"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex rounded border-2 border-black">
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            name="lastname"
            placeholder="Last Name"
            className="w-full p-1 px-2 form-input 
            block leading-none focus:outline-none placeholder-black/50 
            [ transition-colors duration-200 ] 
            [ py-3 md:py-4 md:pr-4 lg:py-4] 
            [ bg-white/20 focus:bg-b/25 ] 
            [ text-[#333] focus:text-white text-xl ]"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1 text-center mt-2 mb-0">
        <span>By clicking “Continue” you agree to our terms and confirm that you are “18” or older</span>
      </div>
    </div>
    </div>
  );
}
