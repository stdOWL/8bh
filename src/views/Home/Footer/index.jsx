import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BoxTitle, SmallTitle } from "../Title";
import "./style.scss";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="home-footer">

      <Container>
        <BoxTitle title="8BetHub" />

        <SmallTitle line="medium">
          <h2>Still have question?</h2>
        </SmallTitle>

        <p>
          Check out our
          <Link to="/"> FAQ </Link>
          and our
          <a taret="_blank" href="https://bitcointalk.org/index.php?topic=5403811.0"> bitcointalk.org thread </a>
          or
          <Link to="/"> Reach out to us! </Link>
        </p>

        <Row className="play-row">
          <Col lg={5} className="col-10">
            <button onClick={() => navigate("/game")} className="primary-btn">
              <span>Play</span>
              <svg
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}
