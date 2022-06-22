import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { SmallTitle, SmallBoxTitle } from "../Title";
import curvyLine from "../../../assets/imgs/curvy-vector.svg";
import { useCountUp } from "react-countup";
import "./style.scss";
import CountUp from "react-countup";

export default function How() {
  const [targetMultiplier, setTargetMultiplier] = useState("2");
  const [multiplier, setMultiplier] = useState("1.00");
  const [previousMultiplier, setPreviousMultiplier] = useState("1.00");
  const [countdownClass, setCountdownClass] = useState("countdown-progress");

  const guess = () => {
    setPreviousMultiplier(multiplier);
    let t = 3;
    t = Math.round(100 * t);
    const e = Math.random();
    t = Math.floor(99 / (1 - e));
    let result = Math.max(100, Math.min(t, 1e8)) / 100;
    setMultiplier(result.toFixed(2));
  };
  const countdownStarted = () => {
    setCountdownClass("countdown-progress");
  };
  const countdownFinished = () => {
    if (targetMultiplier > multiplier) setCountdownClass("countdown-lose");
    else setCountdownClass("countdown-win");
  };
  return (
    <div className="how">
      <Container>
        <Row className="justify-content-between">
          <Col lg={6} className="desc">
            <SmallTitle line="medium">
              <h2>How to Play our Game</h2>
            </SmallTitle>

            <p>
              You must guess the outcome number or what it will exceed on a
              scale from 1x to 1,000,000x (without picking 1x); this will be
              randomly generated as per our provable fair system and house edge.
            </p>

            <p>Why don't you see for yourself?</p>
          </Col>

          <Col lg={6} className="guess">
            <Row className="home-title small-box">
              <Col sm={5} md={6} lg={11} xl={8} className="col-8 box">
                <h1 className={countdownClass + " mx-auto"}>
                  <CountUp
                    start={previousMultiplier}
                    end={multiplier}
                    duration={1}
                    separator=""
                    decimals={2}
                    decimal="."
                    suffix="X"
                    onEnd={countdownFinished}
                    onStart={countdownStarted}
                  />
                  <img src={curvyLine} />
                </h1>
              </Col>
            </Row>
            <div className="multiplier">
              <span className="guess-multip">Guess a multiplier:</span>

              <div className="guess-input">
                <input
                  value={targetMultiplier}
                  onInput={(e) => setTargetMultiplier(e.target.value)}
                />
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
          {stats.map(({ label, text }, index) => (
            <Col className="item" key={`stats_${label}`}>
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
  { label: "₿2", text: "BANKROLL" },
  { label: "1%", text: "HOUSE EDGE" },
  { label: "$20000", text: "MAX PROFIT" },
  { label: "$5000", text: "MAX BET" },
];
