import React from "react";
import { Col, Row } from "react-bootstrap";
import "./style.scss";
import { useSelector } from "react-redux";

export default function EmailAddress() {
  const { LOGGED_IN, email } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    email: user ? user.email : null,
  }));

  return (
    <Row className="email-address">
      <Col lg={6}>
        <p className="desc">
          Your email address is used to secure your account and reset your
          password in case you forget it.
        </p>
        <span>Current email address:</span>
        <br />
        <span className="contact-email">{email}</span>
      </Col>
      <Col lg={6}>
        <p className="desc">
          If you want to use a different email address you can change it below:
        </p>
        <div className="form-group">
          <div className="label">Email address</div>
          <input placeholder="Enter email" />
        </div>
        <button className="primary-btn">Change Address</button>
      </Col>
    </Row>
  );
}
