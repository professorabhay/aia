"use client";

import { useEffect, useState } from "react"
import Footer from "./components/Footer/Footer"
import Hero from "./components/Hero/Hero"
import Impact from "./components/Impact/Impact"
import Mission from "./components/Mission/Mission"
import Navbar from "./components/Navbar"
import Products from "./components/Products/Products"
import Services from "./components/Sevices/Services"
import Loading from "./components/Loading"
import { Decoy } from "./components/Decoy"
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}



function App() {
  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState(null);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
      window.scrollTo(0, 0)
    },2500)
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(new Web3(window.ethereum));
        setAccount(accounts[0]);
        console.log("Connected account: ", accounts[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      console.error("Please install MetaMask!");
    }
  };

  const mintNFT = async () => {
    if (!web3 || !account) return;
    
    const contractAddress = "0xE40E0337970D70eB041B25d3723f06777ed79561";
    const contractABI: any[] = [/* Your contract ABI here */];
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      const response = await contract.methods.mint(account, "https://yourbaseuri.com/token-metadata").send({ from: account });
      console.log("Minting success: ", response);
    } catch (error) {
      console.error("Error minting NFT", error);
    }
  };

  return (
    loading?<>
    <Loading />
    <Decoy />
    </>:
    <div className="my-div px-4 md:px-10 py-6 font-nasa">
    <Navbar />
    <Hero />
    <div className="mt-10 text-4xl">
      {!account && <button onClick={connectWallet}>Connect Wallet</button>}
      {account && <button onClick={mintNFT}>Mint NFT</button>}
    </div>
    <Mission />
    <Products />
    <Services />
    <Impact />
    <Footer />
  </div>
  )
}

export default App
