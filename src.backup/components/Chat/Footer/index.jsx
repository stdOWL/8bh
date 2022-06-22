import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

export default function Footer({ message, sendMsg, setMessage }) {
  const { LOGGED_IN } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
  }));
  return (
    <div className="chat-footer">
      <div className="custom-input">
        <input
          placeholder="Chat here"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          onKeyDown={({ key }) => key === "Enter" && sendMsg()}
        />
        <svg
          onClick={sendMsg}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 2L11 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
