import React, { useState, useEffect } from "react";
import { Image, Dropdown, Nav } from "react-bootstrap";
import { links } from "./data";
import dicelogo from "../../assets/imgs/dicelogo.svg";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import "./style.scss";
import { useSelector } from "react-redux";
import { setLogout } from "../../lib/user";
import { defaultSocket } from "../../lib/sockets";

export default function NavBar(a) {
  const { LOGGED_IN, name, searchCurrencies, stream_token } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    name: user ? user.username : null,
    searchCurrencies: user ? user.balances : [],
    stream_token: user ? user.stream_token : null
  }));

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [currencies, setCurrencies] = useState(searchCurrencies);

  const [currency, setCurrency] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleCurrenciesChange = ({ target: { value } }) => {
    const newCurrs = searchCurrencies.filter((cur) =>
      cur.name.toLowerCase().includes(value.toLowerCase())
    );
    setCurrencies(newCurrs);
  };

  useEffect(() => {
    if (LOGGED_IN && searchCurrencies.length > 0) {
      
      setCurrencies(searchCurrencies);
      setCurrency(searchCurrencies[0]);
      setHovered(searchCurrencies[0]);

    }
    
  }, [LOGGED_IN, searchCurrencies]);

  const [viewUsd, setViewUsd] = useState(true);

  const logout = () => {
    setLogout();
  };
  return (
    <div className="navbar-container">
      <Menu open={open} />
      <div className="nav-bar">
        <Image
          onClick={() => navigate("/")}
          src={dicelogo}
          alt="dice logo"
          className="dicelogo"
        />

        <Nav className="menu ms-lg-auto">
          <ul className="list p-0">
            {LOGGED_IN ? (
              <>
                <li className="balance">
                  <span>Balance: {currency?.balance}</span>
                  <div className="currency">
                    <span>Currency :</span>
                    <Dropdown>
                      <Dropdown.Toggle>
                        {currency?.name.toUpperCase()}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <div className="inner">
                          <div className="search">
                            <input
                              onChange={handleCurrenciesChange}
                              placeholder="Search currency"
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>

                          <div className="currencies">
                            {currencies.map((cur, index) => (
                              <Dropdown.Item
                                key={cur.name}
                                onClick={() => setCurrency(cur)}
                                onMouseEnter={() => setHovered(cur)}
                                className="currency"
                              >
                                <div className="left">
                                  <Image
                                    src={ "/currencies/" + cur.balance + ".png" }
                                    alt={cur.name}
                                  />
                                  <span>{cur.name.toUpperCase()}</span>
                                </div>
                                <div className="right">
                                  ${cur.balance.toFixed(10)}
                                </div>
                              </Dropdown.Item>
                            ))}
                          </div>
                        </div>
                        <div className="bottom">
                          <div className="left">
                            <span>{hovered?.name.toUpperCase()} Price </span>
                            <span className="dolla">$</span>
                            <span> {Number(2000).toFixed(5)}</span>
                          </div>

                          <div className="right">
                            <span>View USD</span>
                            <div
                              onClick={() => setViewUsd(!viewUsd)}
                              className="switch"
                            >
                              <div
                                className={`toggle ${
                                  viewUsd ? "toggle-on" : "toggle-off"
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </li>

                <li className="d-none d-lg-flex profile px-2rem">
                  {/* <Image
                    src={user}
                    alt='user profile'
                  /> */}
                  <Dropdown>
                    <Dropdown.Toggle>{name}</Dropdown.Toggle>

                    <Dropdown.Menu>
                      {links.map((link) => (
                        <Dropdown.Item
                          key={link.id}
                          onClick={() => navigate(link.to)}
                        >
                          {link.name}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Item key="logoutnav">
                        <button className="logoutbtn" onClick={logout}>
                          Logout
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            ) : (
              <>
                <li className="d-none d-lg-flex">
                  <button
                    onClick={() =>
                      navigate("/login", {
                        state: { changed: Math.random() },
                      })
                    }
                    className="nav-button"
                  >
                    <span>Login</span>
                  </button>
                </li>
                <li className="d-none d-lg-flex px-2rem">
                  <button
                    onClick={() =>
                      navigate("/register", {
                        state: { changed: Math.random() },
                      })
                    }
                    className="nav-button"
                  >
                    <span>Register</span>
                  </button>
                </li>
              </>
            )}

            <li className="d-none d-lg-flex">
              <button onClick={() => navigate("/game")} className="nav-button">
                <span>Play</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1849 8.6295L7.29519 16.5192L5.99902 15.2231L13.8879 7.33333H6.93494V5.5H17.0183V15.5833H15.1849V8.6295Z"
                    fill="white"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </Nav>

        <div onClick={() => setOpen(!open)} className="open-nav d-lg-none">
          {!open ? (
            <svg
              width="24"
              height="19"
              viewBox="0 0 24 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.22986"
                y1="-1.22986"
                x2="22.7701"
                y2="-1.22986"
                transform="matrix(-1 0 0 1 24 3)"
                stroke="white"
                strokeWidth="2.45972"
                strokeLinecap="round"
              />
              <line
                x1="1.22986"
                y1="-1.22986"
                x2="22.7701"
                y2="-1.22986"
                transform="matrix(-1 0 0 1 24 19)"
                stroke="white"
                strokeWidth="2.45972"
                strokeLinecap="round"
              />
              <line
                x1="1.22986"
                y1="-1.22986"
                x2="12.952"
                y2="-1.22986"
                transform="matrix(-1 0 0 1 24 11)"
                stroke="white"
                strokeWidth="2.45972"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.22986"
                y1="-1.22986"
                x2="22.7701"
                y2="-1.22986"
                transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.7627 19)"
                stroke="white"
                stroke-width="2.45972"
                stroke-linecap="round"
              />
              <line
                x1="1.22986"
                y1="-1.22986"
                x2="22.7701"
                y2="-1.22986"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 19.4316 2.0293)"
                stroke="white"
                stroke-width="2.45972"
                stroke-linecap="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
