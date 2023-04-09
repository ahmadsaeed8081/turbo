/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Main from "./Pages/Home";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

function App() {
  const [_address, set_address] = useState(null);
  const [web3, set_web3] = useState(null);
  const [provider, set_provider] = useState(null);
  
  const [isWalletConnected, set_isWalletConnected] = useState(false);


  function set_user(_add,_provider,_web3){
    console.log("ihjono")
    set_isWalletConnected(true);
    set_provider(_provider);
    set_web3(_web3);

  }


  return (
    <div className="App">
      <Header set_user={set_user}/>
      <Routes>
        <Route path="/" element={<Main web3={web3} provider={provider} isWalletConnected={isWalletConnected}/>} exact />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
