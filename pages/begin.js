import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Begin from "../components/Begin";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Begin />
      </main>
      <Footer />
    </>
  );
}
