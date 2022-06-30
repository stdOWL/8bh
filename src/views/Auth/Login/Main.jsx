import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import refreshIcon from "../../../assets/imgs/refresh-2.svg";
import { Link, useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useLayout } from "../../../components/Layout/context/layoutContext";

import { notify, api, token } from "../../../util";
import { getAccount } from "../../../lib/user";
import { defaultSocket } from "../../../lib/sockets";

export default function Main() {
  const getUid = () => uniqid().toUpperCase() + uniqid().toUpperCase();

  const [generatedPassword, setGeneratedPassword] = useState(getUid());
  const [generating, setGenerating] = useState(false);
  const { loginModalShow, setLoginModalShow, setRegisterModalShow } =
    useLayout();

  const [TFARequired, setTFARequired] = useState(false);
  const [TFACode, setTFACode] = useState("");

  const [loginUsernameEmail, setLoginUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const generatePasssword = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedPassword(getUid());
      setGenerating(false);
    }, 2000);
  };

  const onLoginClick = () => {
    const login = async () => {
      try {
        const { tokens, user } = await api.post("/auth/login", {
          email: loginUsernameEmail,
          password: password,
          tfaCode: TFACode,
        });
        token.setUser({ tokens, user });

        const r = await getAccount();
        if (r) {
          

          setLoginModalShow(false);
          defaultSocket.subscribeUser(r.stream_token);
          navigate("/game");
        }
      } catch (err) {
        if (err.message === "TFA-Required") {
          setTFARequired(true);
        } else notify.error(err.message);
      }
    };
    login();
  };

  return (
    <div className="login">
      <Modal.Body>
        {TFARequired ? (
          <>
            <Header title="Verify Two-Factor Authentication" />

            <div className="form-group last">
              <div className="label">
                Verification Code<span className="require-field">*</span>
              </div>
              <input
                type="number"
                value={TFACode}
                onInput={(e) => setTFACode(e.target.value)}
                placeholder="Enter verification code"
              />
            </div>
          </>
        ) : (
          <>
            <Header title="Login" />

            <div className="form-group">
              <div className="label">
                Login<span className="require-field">*</span>
              </div>
              <input
                value={loginUsernameEmail}
                onInput={(e) => setLoginUsernameEmail(e.target.value)}
                placeholder="Username or Email"
              />
            </div>
            <div className="form-group">
              <div className="label">
                Password<span className="require-field">*</span>
              </div>
              <input
                type="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {<div style={{ marginTop: "0.5rem" }}>
                <div className="rememberMe">
                  <Form.Check
                    id="instant-withdrawal-check"
                    label="Remember me"
                  />
                </div>
              </div>
        }
              <Link to="/RessetPassword" className="forgot-password">
                <span>Forgot your password?</span>
              </Link>
            </div>
          </>
        )}
        {false && (
          <div className="form-group last">
            <div className="label">One-time password</div>
            <div className="custom-input ">
              <input
                placeholder="Enter current password"
                value={generatedPassword}
                readOnly
              />
              <div
                onClick={generatePasssword}
                className={`refresh-icon ${
                  generating ? "refresh-active" : null
                }`}
              >
                <img src={refreshIcon} alt="refresh icon" />
              </div>
            </div>
          </div>
        )}

        <button onClick={onLoginClick} className="primary-btn">
          Sign in
        </button>
        <a
          href="#"
          onClick={() => {
            setLoginModalShow(false);
            setRegisterModalShow(true);
          }}
          className="forgot-password"
        >
          <span>Register</span>
        </a>
        <Footer />
      </Modal.Body>
    </div>
  );
}
