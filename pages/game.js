import GameBoard from "../components/gameplay/GameBoard";
import MainNavbar from "../components/MainNavbar";
import { GameplayContextProvider } from "../contexts/GameplayContext";

export default function game() {
  return (
    <GameplayContextProvider>
      <MainNavbar />
      <GameBoard />
    </GameplayContextProvider>
  );
}
