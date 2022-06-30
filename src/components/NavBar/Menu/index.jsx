import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import { setLogout, updateSelectedAssetCode } from "../../../lib/user";
import { defaultSocket } from "../../../lib/sockets";
import { useLayout } from "../../Layout/context/layoutContext";
export default function Menu({ open }) {
  const { LOGGED_IN, name, stream_token } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    name: user ? user.username : null,
    stream_token: user ? user.stream_token : null,
  }));
  const { setRegisterModalShow, setLoginModalShow, loginModalShow } =
    useLayout();
  const navigate = useNavigate();
  const [openLinks, setOpenLinks] = useState(false);
  const logout = () => {
    defaultSocket.unsubscribeUser(stream_token);
    setLogout();
    setOpenLinks(false);
  };
  return (
    <div className={`mobile-menu ${open ? "open-mobile-menu" : ""}`}>
      <ul className="list-group">
        {LOGGED_IN && (
          <li className="user-drop">
            <button onClick={() => setOpenLinks(!openLinks)}>
              {name}
              <svg
                className={openLinks ? "open-svg" : ""}
                width="7"
                height="4"
                viewBox="0 0 7 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.37703 3.84277L6.62237 0.470117H0.131695L3.37703 3.84277Z"
                  fill="white"
                />
              </svg>
            </button>

            {openLinks ? (
              <ul className="list-group links-list-group">
                <li onClick={() => navigate("/AccountSecurity")} key={0}>
                  Account Security
                </li>
                <li onClick={() => navigate("/Deposit")} key={1}>
                  Deposit
                </li>
                <li onClick={() => navigate("/Withdraw")} key={2}>
                  Withdraw
                </li>
                <li onClick={() => navigate("/Game")} key={3}>
                  Game
                </li>
                <li onClick={() => navigate(`/Player/${name}`)} key={4}>
                  Player
                </li>
              </ul>
            ) : null}
          </li>
        )}
        <li className="play">
          <button onClick={() => navigate("/game")}>
            Play
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.055 2.55741L1.1418 8.47061L0.170349 7.49916L6.08286 1.58596H0.871799V0.211914H8.42905V7.76916H7.055V2.55741Z"
                fill="white"
              />
            </svg>
          </button>
        </li>
        <li>
          <button onClick={() => setLoginModalShow(true)}>Login</button>
        </li>
        <li>
          <button onClick={() => setRegisterModalShow(true)}>Register</button>
        </li>
        {LOGGED_IN && (
          <li className="logout">
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
}
