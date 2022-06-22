import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import uniqid from "uniqid";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { notify, api, token } from "../../../util";
import { getAccount } from "../../../lib/user";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onRegisterClick = () => {
    const register = async () => {
      try {
        const { tokens, user } = await api.post("/auth/register", {
          name: username,
          email: email,
          password: password,
        });
        token.setUser({ tokens, user });

        const r = await getAccount();
        if (r) {
          navigate("/play");
          notify.success('Successfully registered!');
        }
      } catch (err) {
        notify.error(err.message);
      }
    };
    register();
  };
  return (
    <div className="register">
      <Modal.Body>
        <Header title="Create new account" />

        <div className="form-group">
          <div className="label">
            User name<span className="require-field">*</span>
          </div>
          <input
            placeholder="Enter username"
            value={username}
            onInput={(e) => setUsername(e.target.value)}
          />
          <span className="label span-username">
            Valid user names are between 3 and 20 characters long and may
            consist of letters and numbers.
          </span>
        </div>
        <div className="form-group">
          <div className="label">
            Email address<span className="require-field">*</span>
          </div>
          <input
            placeholder="Enter valid email address"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div className="label">
            Password<span className="require-field">*</span>
          </div>
          <input
          
            type="password"
            placeholder="Enter password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
          <span>
            Your account's email address is used to send you login authorization
            links, reset your password in case you forget it, and send you
            important messages about your account. You can register multiple
            accounts to the same address.
          </span>
        </div>

        <div className="form-group check-terms">
          <Form.Check
            id="agree-terms-check"
            label="I have read and agree to the terms of service."
          />
        </div>

        <button onClick={onRegisterClick} className="primary-btn">
          Create Account
        </button>

        <Footer />
      </Modal.Body>
    </div>
  );
}
