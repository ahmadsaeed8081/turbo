import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchIcon, MenuIcon } from "../../icons";

import ConnectWallet from "../ConnectWallet.js";
import Modal from "../../components/Modal";

import { cont_address, cont_abi, tokenABI, Token_address } from "../config";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { Provider } from "web3modal";
import { PropaneSharp, QrCode } from "@mui/icons-material";



const Header = (props) => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openWalletList, setOpenWalletList] = useState(false);
  const [_address, set_user_address] = useState(null);
  const [balance, setBalance] = useState(0);
  const [matic, set_matic] = useState(0);
  const[clicked,set_clicked]=useState(false)

  useEffect(() => {
    document.addEventListener("click", () => {
      setOpenMenu(false);
      setOpenWalletList(false);
    });
  }, []);


async function Sign_out()
{
  const provider = new WalletConnectProvider({
    rpc: {
      137:"https://polygon-mainnet.infura.io/v3/294ba86a2f504ea0947006554734c90b" 
    },
    chainId: 137,
  });
  try{
    await provider.disconnect();
    window.location.reload();

  }
  catch{

  }
}

  async function Connect_Wallet(id) {
    let provider;
    let web3;
    let accounts;

    const NETWORK_ID = "137";
    const NETWORK_ID_hex = "0x89";
    // const NETWORK_ID = "97";
    // const NETWORK_ID_hex = "0x61";
    set_clicked(true);

    if (id == "1") {
      //metmask
      provider = window.ethereum;
      console.log("meta and trust provider");
      // alert(provider._metamask);
      console.log(provider.isMetaMask);
      web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();

      if (networkId == NETWORK_ID) {
        accounts = await provider.request({ method: "eth_requestAccounts" });
        set_user_address(accounts[0]);
        setOpen(false);
        props.set_user(_address, web3, provider, set_values);
        const contract1 = new web3.eth.Contract(tokenABI, Token_address);

        let balance = await contract1.methods.balanceOf(accounts[0]).call();

        let matic = await web3.eth.getBalance(accounts[0]);
        balance = web3.utils.fromWei(balance, "ether");
        matic = web3.utils.fromWei(matic, "ether");

        setBalance(parseFloat(balance).toFixed(2));
        set_matic(parseFloat(matic).toFixed(3));

        console.log("object" + matic);
      } else {
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: NETWORK_ID_hex }],
          });
          Connect_Wallet(id);
        } catch {}
      }
    } else if (id == "2") {
      //trust 1Wallet
      provider = new WalletConnectProvider({

        rpc: {
          // 137: "https://polygon-mainnet.g.alchemy.com/v2/eRdxPlEv3QpMS-1nPDFkjtO-qDmurAoF",
          137:"https://polygon-mainnet.infura.io/v3/294ba86a2f504ea0947006554734c90b"        },
        chainId: 137,
      });

      console.log(provider);
      console.log(provider.wc.peerMeta);
      await provider.enable();

      console.log("this is provider");
      console.log(provider.wc.peerMeta.name);

      web3 = new Web3(provider);

      const networkId = await web3.eth.net.getId();
      console.log("yguygy7 " + networkId);
      if (networkId == NETWORK_ID) {
        accounts = await web3.eth.getAccounts();

        set_user_address(accounts[0]);
        setOpen(false);

        props.set_user(_address, web3, provider, set_values);

        const contract1 = new web3.eth.Contract(tokenABI, Token_address);

        let balance = await contract1.methods.balanceOf(accounts[0]).call();

        let matic = await web3.eth.getBalance(accounts[0]);
        balance = web3.utils.fromWei(balance, "ether");
        matic = web3.utils.fromWei(matic, "ether");

        setBalance(parseFloat(balance).toFixed(2));
        set_matic(parseFloat(matic).toFixed(3));
      }
    } else if (id == "3") {
      //Wallet connect
      provider = new WalletConnectProvider({
        // infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
        rpc: {

          137:"https://polygon-mainnet.g.alchemy.com/v2/bf3cnZO2AQyu_Kv4eBx6uI0Slhs5GhMv"
        },
        chainId: 137,
      });
      await provider.enable();

     

      console.log("this is provider");
      console.log(provider.wc.peerMeta);

      web3 = new Web3(provider);

      const networkId = await web3.eth.net.getId();
      console.log("yguygy7 " + networkId);
      if (networkId == NETWORK_ID) {
        accounts = await web3.eth.getAccounts();
        console.log("accounts  " + accounts[0]);

        setOpen(false);


        const contract1 = new web3.eth.Contract(tokenABI, Token_address);
        console.log("hello");

        let balance = await contract1.methods.balanceOf(accounts[0]).call();
        let matic = await web3.eth.getBalance(accounts[0]);
        console.log("balance1  ");

        balance = web3.utils.fromWei(balance, "ether");
        matic = web3.utils.fromWei(matic, "ether");
        console.log("balance  " + balance);

        setBalance(parseFloat(balance).toFixed(2));

        set_matic(parseFloat(matic).toFixed(3));
        set_user_address(accounts[0]);
        props.set_user(_address, web3, provider, set_values);

      } else {
        if (provider.wc.peerMeta.name == "MetaMask") {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }],
          });
          Connect_Wallet(id);
        } else {
          setOpen(false);

          await provider.disconnect();
          alert("Kindly change your network to polygon");
        }
      }
    }
  }

  function set_values(_matic, _usdt) {
    set_matic(_matic);
    setBalance(_usdt);
  }

  const Actions = () => {
    return (
      <div className="action flex items-center">
        <div className="btn button">
          <p>{matic} MATIC</p>
        </div>
        <div className="btn button">
          <p>{balance} DAI</p>
        </div>
        <>
        {_address == null?(

          <div
            className="btn2 button"
            onClick={(e) => {
              e.stopPropagation();
              // setOpenWalletList(!openWalletList);
              setOpen(true);
            }}
          >
            <p>
              Connect Wallet                
            </p>
          </div>
        ):(
          <>
          <div
            className="btn button"
            onClick={(e) => {
              e.stopPropagation();
              // setOpenWalletList(!openWalletList);
              setOpen(true);
            }}
          >
            <p>
              { _address.slice(0, 4) + "..." + _address.slice(39, 42)}
            </p>
          </div>
          <div
            className="btn2 button"
            onClick={(e) => {
              Sign_out();
            }}
          >
            <p>
              Sign Out
            </p>
          </div>
          </>
        )}

          <div
            className={`wallet-list flex flex-col ${
              openWalletList ? "show" : "hide"
            }`}
          >
            <div className="tag flex items-center">
              <img className="img" src="./images/user1.png" />
              <div className="lbl">MetaMask</div>
            </div>
            <div className="tag flex items-center">
              <img className="img" src="./images/user1.png" />
              <div className="lbl">Trust Wallet</div>
            </div>
            <div className="tag flex items-center">
              <img className="img" src="./images/user1.png" />
              <div className="lbl">Wallets Connect</div>
            </div>
          </div>
        </>
      </div>
    );
  };
  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <Link to={"/"}>
            <img src="./images/logo.png" className="logo-img cursor-pointer" />
          </Link>
        </div>
        <div className="right flex items-center justify-end">
          <div className="desktop-menu flex items-center">
            <Actions />
          </div>
          <div
            className="menu-icon"
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(!openMenu);
            }}
          >
            <MenuIcon />
          </div>
          <div
            className={`menu-list flex flex-col ${openMenu ? "show" : "hide"}`}
          >
            <Actions />
          </div>
        </div>
      </div>
      {_address == null ? (
        <Modal open={open} onClose={() => setOpen(false)}>
          <ConnectWallet setOpen={setOpen} Connect_Wallet={Connect_Wallet} />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
