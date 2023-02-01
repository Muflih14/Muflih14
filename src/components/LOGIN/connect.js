import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Connect = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [connButtonText, setConnButtonText] = useState("CONNECT WALLET");

  const navigate = useNavigate();

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setConnButtonText("CONNECTED");
          navigate("/projects");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <>
      <div className="connectWallet">
        <button className="button" onClick={connectWalletHandler}>
          {connButtonText}
        </button>
      </div>
      <div>{errorMessage}</div>
    </>
  );
};

export default Connect;
