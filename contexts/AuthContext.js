import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [registeredUser, setRegisteredUser] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setRegisteredUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  const addData = async() => {
    try {
      const docRef = await addDoc(collection(db, "accounts"), {
        FirstName: firstName,
        lastName: lastName
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleSignup = async () => {
    try {
      if (
        !email ||
        !password ||
        !confirmPassword ||
        confirmPassword !== password
      )
        return alert("please fill form properly");
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setIsSuccess(true)
    } catch (error) {
      console.log(error.message);
      setIsSuccess(false)
    }
  };

  const connectWallet = async() => {
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
      try {
        const account = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log(account[0]);
        setAddress(account[0])
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  useEffect(() => {
    addWalletListener();
    getCurrentWalletConnected()
  }, [address])

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        handleSignup,
        email,
        password,
        setPassword,
        setConfirmPassword,
        confirmPassword,
        setEmail,
        registeredUser,
        isSuccess,
        setIsSuccess,
        firstName,
        lastName,
        addData,
        address,
        connectWallet,
        setFirstName,
        setLastName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useStateContext = () => useContext(AuthContext);
