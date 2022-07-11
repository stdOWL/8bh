import React, { useRef, useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { useLayout } from "../Layout/context/layoutContext";
import Footer from "./Footer";
import Header from "./Header";
import { defaultSocket } from "../../lib/sockets";
import { getLatestMessages } from "../../lib/chat";
import { notify, api } from "../../util";
import Moment from "react-moment";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import "moment-timezone";

import "./style.scss";

function Chat() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const { openChat } = useLayout();

  const [messages, updateMessages] = useImmer([]);

  const [message, setMessage] = useState("");

  const messagesRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await api.get("/chat/latest");
        /*const filteredMessages = messages.filter((message) => {
          return !userMutes[message.userId];
        });*/

        updateMessages(() => messages);
        setLoading(false);
        if (messagesRef.current)
          messagesRef.current.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    if (openChat) {
      loadMessages();
    } else {
      setLoading(true);
      updateMessages(() => []);
    }
  }, [openChat]);
  useEffect(() => {
    const onMessage = (message) => {
      updateMessages((messages) => {
        messages.push(message);
      });
      if (messagesRef.current)
        messagesRef.current.scrollIntoView({ behavior: "smooth" });
    };

    defaultSocket._socket.on("chat_message", onMessage);

    return () => {
      defaultSocket._socket.off("chat_message", onMessage);
    };
  });

  const sendMsg = () => {
    const postMessage = async (message) => {
      try {
        await api.post("/chat/message", { message });
        setMessage("");
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    postMessage(message);

    //setMessages([...messages, newMessage]);
    //setMessage("");
  };

  return (
    <div className="chat">
      <Header />

      {loading ? (
        <div className="messages">
          <Stack spacing={0.02}>
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
            <Skeleton variant="text" height={80} animation="wave" />
          </Stack>
        </div>
      ) : (
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={msg.id} className="message">
              <div className="info">
                <span
                  className={`username playerLink username-${msg.role ? msg.role : 'USER'}`}
                  onClick={() => navigate(`/Player/${msg.username}`)}
                >
                  {msg.username}
                </span>
                <span className="time">
                  <Moment date={msg.createdAt} fromNow />
                </span>
              </div>
              <div className={`body body-${msg.role ? msg.role : 'USER'}`}>
                {msg.message.split(" ").map((word, index) => {
                  if (word.startsWith("@"))
                    return (
                      <span key={index} className="mention">
                        {word}
                      </span>
                    );
                  return ` ${word} `;
                })}
              </div>
            </div>
          ))}

          <div ref={messagesRef}></div>
        </div>
      )}

      <Footer sendMsg={sendMsg} message={message} setMessage={setMessage} />
    </div>
  );
}

export default React.memo(Chat);
