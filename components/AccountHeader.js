
import {signOut} from 'firebase/auth'
import { useRouter } from 'next/router';
import { auth } from '../firebase';

export default function AccountHeader() {
  const router = useRouter()
  const handleLogOut = async() => {
    await signOut(auth);
    router.push("/home");
  }
  return (
    <>
      <div className="flex mb-5 justify-between items-center font-semibold">
        <div className="px-10 py-5 w-1/4 text-center bg-blue-400 cursor-pointer">
          <h1> Account History</h1>
        </div>
        <div onClick={handleLogOut} className="px-10 py-5 w-1/4 text-center text-red-500 bg-white cursor-pointer">
          <h1>Logout</h1>
        </div>
        <div className="px-10 py-5 w-1/4 text-center cursor-pointer"></div>
      </div>
      <hr className="mb-3" />
    </>
  );
}
