import NavBar from "../NavBar/NavBar";
import Connect from "./connect";
import "./login.css";

function LogIn() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="content">
        <h2>Log IN</h2>

        <div className="buttons">
          <Connect />
          <button className="button">
            <a href="https://bitcoin.org/en/choose-your-wallet">
              CREATE A WALLET
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
export default LogIn;
