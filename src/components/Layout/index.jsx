import React from "react";
import chatIcon from "../../assets/imgs/chat.svg";
import NavBar from "../NavBar";
import History from "../History";
import Chat from "../Chat";
import "./style.scss";
import { useLayout } from "./context/layoutContext";
import Modal from "@mui/material/Modal";

function Layout({ title, container = true, history = true, children }) {
  const { isLargeScreen, openChat, setOpenChat, setRegisterModalShow } = useLayout();
 

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
