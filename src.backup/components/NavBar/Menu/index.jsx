import React, { useState } from "react";
import { links } from "../data";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
export default function Menu({ open }) {
  const { LOGGED_IN, name } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    name: user ? user.username : null,
  }));

  const navigate = useNavigate();
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <div className={`mobile-menu ${open ? "open-mobile-menu" : ""}`}>
      <ul className="list-group">
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
              {links.map((link, index) => (
                <li onClick={() => navigate(link.to)} key={index}>
                  {link.name}
                </li>
              ))}
            </ul>
          ) : null}
        </li>

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

        <li className="logout">
          <button>Logout</button>
        </li>
      </ul>
    </div>
  );
}
