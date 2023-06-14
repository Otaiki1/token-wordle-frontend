import { GameplayProvider } from "../contexts";
import { AuthContextProvider } from "../contexts/AuthContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <GameplayProvider>
        <Component {...pageProps} />
      </GameplayProvider>
    </AuthContextProvider>
  );
}
