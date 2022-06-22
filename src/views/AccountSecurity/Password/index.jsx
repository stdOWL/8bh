import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import refreshIcon from "../../../assets/imgs/refresh-2.svg";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import { notify, api, token } from "../../../util";
import { getAccount } from "../../../lib/user";

export default function Password() {
  /* const getUid = () => uniqid().toUpperCase() + uniqid().toUpperCase();

  const [generatedPassword, setGeneratedPassword] = useState(null);
  const [generating, setGenerating] = useState(false);

  const generatePasssword = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedPassword(getUid());
      setGenerating(false);
    }, 2000);
  };
  const { LOGGED_IN, email } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    email: user ? user.email : null,
  }));*/
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const onChangeClick = () => {
    const changeEmail = async () => {
      try {
        const { tokens, user } = await api.post("/account/changePassword", {
          password,
          newPassword: repassword,
        });
        token.setUser({ tokens, user });

        const r = await getAccount();
        if (r) {
          notify.success(
            "Successfully changed email address and all sessions dropped!"
          );
        }
      } catch (err) {
        notify.error(err.message);
      }
    };
    changeEmail();
  };
  return (
    <Row className="password">
      <Col lg={6} className="desc">
        <p>
          Coming up with secure passwords is hard for humans, which is why we've
          generated a strong password for you. Please write it down somewhere
          safe and do not use it on other sites!
        </p>
        <p>
          After you have updated your password you will be signed out on all
          other browsers and devices.
        </p>
        <p>
          Consider using a password manager like <span> LastPass </span> or{" "}
          <span>KeePassX</span>. We also recommend that you set a recovery email
          address and enable 2FA.
        </p>
      </Col>
      <Col lg={6}>
        <div className="form-group">
          <div className="label">
            New password<span className="require-field">*</span>
          </div>
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="form-group">
          <div className="label">Repeat new password</div>
          <div className="custom-input ">
            <input
              value={repassword}
              onChange={({ target }) => setRepassword(target.value)}
              placeholder="Enter new password"
            />
            {/*<div onClick={generatePasssword} className={`refresh-icon ${generating ? 'refresh-active' : null}`}>
                            <img src={refreshIcon} alt='refresh icon' />
    </div>*/}
          </div>
        </div>
        <button onClick={onChangeClick} className="primary-btn">Change Password</button>
      </Col>
    </Row>
  );
}
