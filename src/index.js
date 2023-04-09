import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Web3ReactProvider>,
  document.getElementById("root")
);

reportWebVitals();
