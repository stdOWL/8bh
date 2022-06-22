import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { SmallTitle, SmallBoxTitle } from "../Title";
import curvyLine from "../../../assets/imgs/curvy-vector.svg";
import { useCountUp } from "react-countup";
import "./style.scss";
import CountUp from "react-countup";

export default function How() {
  const [multiplier, setMultiplier] = useState("1.00");
  const [previousMultiplier, setPreviousMultiplier] = useState("1.00");

  const guess = () => {
    setPreviousMultiplier(multiplier);
    let t = 3;
    t = Math.round(100 * t);
    const e = Math.random();
    t = Math.floor(99 / (1 - e));
    let result = Math.max(100, Math.min(t, 1e8)) / 100;
    setMultiplier(result.toFixed(2));
  };
  return (
    <div className="how">
      <Container>
        <Row className="justify-content-between">
          <Col lg={6} className="desc">
            <SmallTitle line="medium">
              <h2>How The Game Works</h2>
            </SmallTitle>

            <p>
              For each bet the outcome is randomly chosen between 1x and
              1,000,000x. It's up to you to guess a target that you think the
              outcome will exceed.
            </p>
            <p>
              If the bet's outcome falls short of your guess, you lose your
              wager. But if you guessed correctly, your wager is multiplied by
              your guess!
            </p>
            <p>Why don't you see for yourself?</p>
          </Col>

          <Col lg={6} className="guess">
            <Row className="home-title small-box">
              <Col sm={5} md={6} lg={11} xl={8} className="col-8 box">
                <h1 className="mx-auto">
                  <CountUp
                    start={previousMultiplier}
                    end={multiplier}
                    duration={1}
                    separator=""
                    decimals={2}
                    decimal="."
                    suffix="X"
                  />
                  <img src={curvyLine} />
                </h1>
              </Col>
            </Row>
            <div className="multiplier">
              <span className="guess-multip">Guess a multiplier:</span>

              <div className="guess-input">
                <input defaultValue={3} />
                <button className="primary-btn" onClick={guess}>
                  Guess
                </button>
              </div>
              <span className="try">Give it a try!!</span>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="stats">
        <Row className="container mx-auto">
          {stats.map(({ label, text }) => (
            <Col className="item" key={label}>
              <SmallTitle line="medium">
                <h2>{label}</h2>
              </SmallTitle>
              <span>{text}</span>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

const stats = [
  { label: "₿1,947", text: "BANKROLL" },
  { label: "1%", text: "HOUSE EDGE" },
  { label: "₿19", text: "MAX PROFIT" },
  { label: "₿2,947", text: "MAX BET" },
];
