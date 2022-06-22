import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./style.scss";
import { useSelector } from "react-redux";
import { notify, api, token } from "../../../util";
import { getAccount } from "../../../lib/user";

export default function EmailAddress() {
  const { LOGGED_IN, userEmail } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    userEmail: user.email
  }));
  const [email, setEmail] = useState("");
  const onChangeClick = () => {
    const changeEmail = async () => {
      try {
        const { tokens, user } = await api.post("/account/changeEmail", {
          email,
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
    <Row className="email-address">
      <Col lg={6}>
        <p className="desc">
          Your email address is used to secure your account and reset your
          password in case you forget it.
        </p>
        <span>Current email address:</span>
        <br />
        <span className="contact-email">{userEmail}</span>
      </Col>
      <Col lg={6}>
        <p className="desc">
          If you want to use a different email address you can change it below:
        </p>
        <div className="form-group">
          <div className="label">Email address</div>
          <input onChange={({ target }) => setEmail(target.value)} placeholder="Enter email" />
        </div>
        <button onClick={onChangeClick} className="primary-btn">
          Change Address
        </button>
      </Col>
    </Row>
  );
}
