import React, { useState } from "react";
import { ethers } from "ethers";
const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null); // error message
  const [defaultAccount, setDefaultAccount] = useState(null); // my default account
  const [userBalance, setUserBalance] = useState(null); //  user balance for matemask
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    // metamask connection here  -----------  :)

    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" }) // ---- request to Conn MetaMask
        // eth_requestAccounts is the  method
        .then((result) => {
          AccountChangeHandler(result[0]); // Array for many Account and i will get First Account
        });
    } else {
      //  first User must be  install metamask ----- :)
      setErrorMessage("Please Install MetaMask");
    }
  };

  const AccountChangeHandler = (newAccount) => {
    // this  function is used to change the   defaultAccount  // get the adresss
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount);
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] }) // check the user Balance
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", AccountChangeHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div className="walletCard">
      <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;
