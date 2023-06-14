import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Landing from "../components/Landing";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Token Wordle</title>
        <meta name="description" content="The tokenized wordle system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Landing />
        <Footer />
      </main>
    </>
  );
}
