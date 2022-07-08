import React, { useEffect, useState } from "react";
import chatIcon from "../../assets/imgs/chat.svg";
import NavBar from "../NavBar";
import History from "../History";
import Chat from "../Chat";
import "./style.scss";
import { useLayout } from "./context/layoutContext";
import Modal from "@mui/material/Modal";
import { isDesktop } from "react-device-detect";
import { api, notify } from "../../util";
import { useSelector } from "react-redux";
import Refresh from "../../assets/imgs/refresh.png";
import SeedManagement from "../../assets/imgs/seed management.png";
import AnimationEnabled from "../../assets/imgs/animation_enabled.png";
import AnimationDisabled from "../../assets/imgs/animation_disabled.png";
import ScrollContainer from "react-indiana-drag-scroll";

function Layout({ title, container = true, history = true, children }) {
  const { isLargeScreen, openChat, setOpenChat, setRegisterModalShow } =
    useLayout();

  useEffect(() => {
    if (isDesktop) {
      setOpenChat(true);
    }
  }, []);
  const [activeHover, setActiveHover] = useState("");
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const mouseIn = (node) => {
    setActiveHover(node);
  };
  const mouseOut = () => {
    setActiveHover("");
  };
  const [open, setOpen] = React.useState(false);

  const showSeedManagment = () => {
    setOpen(true);
  };
  const [statistics, setStatistics] = useState({
    wagers: 0,
    profit: 0,
    game_count: 0,
    win_count: 0,
  });

  const { setLoginModalShow, loginModalShow } = useLayout();
  const [busy, setBusy] = useState(false);

  const resetStatistics = () => {
    if (LOGGED_IN === false) {
      if (!loginModalShow) setLoginModalShow(true);
      return;
    }

    const fetchResetStatistics = async () => {
      try {
        const response = await api.get("/bet/resetDiceStatistics");

        if (response.error) {
          notify.error(response.error);
          return;
        }
        setStatistics({
          wagers: 0,
          profit: 0,
          game_count: 0,
          win_count: 0,
        });
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      } finally {
        setBusy(false);
      }
    };
    setBusy(true);
    fetchResetStatistics();
  };

  const { LOGGED_IN, selectedAssetCode, currencies } = useSelector(
    ({ user }) => ({
      LOGGED_IN: !!user,
      selectedAssetCode: user ? user.selectedAssetCode : null,
      currencies: user ? user.balances : [],
    })
  );

  return (
    <>
      <div className={`layout`}>
        <div className="main-row">
          <div className={`main ${openChat && isLargeScreen && "open-main"}`}>
            <NavBar />
            {container && (
              <div className="open-chat-icon">
                <img onClick={() => setOpenChat(!openChat)} src={chatIcon} />
              </div>
            )}

            {title ? (
              <div className={!openChat ? "container" : null}>
                <h1 className="title display-4">{title}</h1>
              </div>
            ) : null}

            {!isLargeScreen ? (
              <div className="open-chat">
                <div
                  className={`inner-chat ${
                    openChat ? "open-inner-chat" : null
                  }`}
                >
                  <Chat
                    key="staticChat"
                    setOpenChat={setOpenChat}
                    openChat={openChat}
                  />
                </div>
              </div>
            ) : null}

            <div className="icon-wraps">
              {/* <div className="d-flex row-gap pb-2 gap-2 icon-wrapper">
                <div className="position-relative pointer">
                  <div
                    className={`position-absolute hover-tip ${
                      activeHover === "seed" ? "block" : "d-none"
                    }`}
                  >
                    Seed Managment
                  </div>
                  <img
                    onClick={showSeedManagment}
                    className="icon"
                    onMouseEnter={() => mouseIn("seed")}
                    onMouseLeave={mouseOut}
                    src={SeedManagement}
                    alt=""
                  />
                </div>
                <div className="position-relative pointer">
                  <div
                    className={`position-absolute hover-tip ${
                      activeHover === "disable" ? "block" : "d-none"
                    }`}
                  >
                    Disable Animation
                  </div>
                  <img
                    onClick={() => {
                      setAnimationEnabled(!animationEnabled);
                    }}
                    className="icon"
                    onMouseEnter={() => mouseIn("disable")}
                    onMouseLeave={mouseOut}
                    src={
                      animationEnabled ? AnimationEnabled : AnimationDisabled
                    }
                    alt=""
                  />
                </div>
                <div className="position-relative pointer">
                  <div
                    className={`position-absolute hover-tip ${
                      activeHover === "reset" ? "block" : "d-none"
                    }`}
                  >
                    Reset Statistics
                  </div>
                  <img
                    onClick={resetStatistics}
                    className="icon"
                    onMouseEnter={() => mouseIn("reset")}
                    onMouseLeave={mouseOut}
                    src={Refresh}
                    alt=""
                  />
                </div>
              </div> */}
            </div>

            <div className={container && !openChat ? "container" : null}>
              {!container && (
                <div
                  className="open-chat-icon"
                  style={{ position: "absolute" }}
                >
                  <img onClick={() => setOpenChat(!openChat)} src={chatIcon} />
                </div>
              )}
              {children}

              {history ? <History /> : null}
            </div>
          </div>

          {isLargeScreen ? (
            <div
              xxl={3}
              className={`chat-main ${openChat && "open-chat-main"}`}
            >
              {" "}
              {/**d-none d-xxl-block */}
              <Chat setOpenChat={setOpenChat} openChat={openChat} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default React.memo(Layout);
