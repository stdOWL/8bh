import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import ethIcon from "../../assets/imgs/eth.png";
import btcIcon from "../../assets/imgs/btc.png";
import Title from "./Title";
import Rollers from "./Rollers";
import Slider from "./Slider";
import Layout from "../../components/Layout";
import "./style.scss";
import { useLayout } from "../../components/Layout/context/layoutContext";
import curvyLine from "../../assets/imgs/curvyLine.svg";
import { api, notify } from "../../util";
import CountUp from "react-countup";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Game() {
  const { openChat } = useLayout();

  const navigate = useNavigate();
  const searchParams = useQuery();

  const [targetMultiplier, setTargetMultiplier] = useState(2.0);
  const [wager, setWager] = useState(0.1);
  const [winChance, setWinChange] = useState(0.1);
  const [profitOnWin, setProfitOnWin] = useState(0.1);
  const [gameResult, setGameResult] = useState("1.00");
  const [previousMultiplier, setPreviousMultiplier] = useState("1.00");

  useEffect(() => {
    let win = ((1 - 0.01) / targetMultiplier) * 100;
    setWinChange(
      win.toLocaleString("en", {
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 3,
      })
    );
    setProfitOnWin(wager * (targetMultiplier - 1));
  }, [targetMultiplier, wager]);

  const searchPlay = searchParams.get("play");
  const rollDice = () => {
    setPreviousMultiplier(gameResult);
    const loadBets = async () => {
      try {
        const { multiplier } = await api.post("/bet/betDice");
        setGameResult(
          (multiplier / 100).toLocaleString("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    loadBets();
  };
  const handleActivePlay = (tab) => {
    navigate(`?play=${tab}`);
  };

  useEffect(() => {
    const filtredplays = playsTabs.filter((p) => p.name === searchPlay);

    if (!filtredplays.length) navigate(`?play=manual`);
  }, [searchPlay]);

  return (
    <div className="game-container">
      <Layout title={null} history={false}>
        <div className="shapes-group" />
        <Row className="game-title justify-content-center">
          <Col md={6} lg={openChat ? 5 : 4} className="col-8 box">
            <h1 className="mx-auto">
              <CountUp
                start={previousMultiplier}
                end={gameResult}
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
        <div className="game">
          <div className="play-box">
            <ScrollContainer className="tabs">
              {playsTabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => handleActivePlay(tab.name)}
                  className={`tab ${searchPlay === tab.name ? "active" : null}`}
                >
                  {tab.label}
                </div>
              ))}
            </ScrollContainer>
            <div className="game-box">
              <div className="calcs">
                <div className="form-group">
                  <div className="label">Wager</div>
                  <div className="custom-input">
                    <input
                      type="number"
                      value={wager}
                      onChange={({ target }) => setWager(target.value)}
                    />
                    <div className="icons">
                      <Image src={ethIcon} alt="eth" />
                    </div>
                  </div>
                </div>

                <div className="icon multip">
                  <svg
                    width="17"
                    height="21"
                    viewBox="0 0 17 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.03698 20.3685C1.57032 20.3685 1.18765 20.2472 0.888984 20.0045C0.590318 19.7432 0.412984 19.4259 0.356984 19.0525C0.319651 18.6605 0.450318 18.2685 0.748984 17.8765L6.57298 10.0925L1.05698 2.70053C0.758318 2.28986 0.627651 1.89786 0.664984 1.52453C0.702318 1.13253 0.870318 0.815196 1.16898 0.57253C1.46765 0.311196 1.84098 0.18053 2.28898 0.18053C2.97965 0.18053 3.60498 0.563196 4.16498 1.32853L8.61699 7.48853L13.069 1.32853C13.629 0.563196 14.2637 0.18053 14.973 0.18053C15.4397 0.18053 15.8223 0.301863 16.121 0.54453C16.4197 0.787197 16.5877 1.10453 16.625 1.49653C16.6623 1.86986 16.5223 2.2712 16.205 2.70053L10.689 10.0925L16.485 17.8765C16.7837 18.2685 16.9143 18.6605 16.877 19.0525C16.8397 19.4259 16.6717 19.7432 16.373 20.0045C16.0743 20.2472 15.6823 20.3685 15.197 20.3685C14.525 20.3685 13.8997 19.9765 13.321 19.1925L8.61699 12.7525L3.94098 19.1925C3.36232 19.9765 2.72765 20.3685 2.03698 20.3685Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div className="form-group">
                  <div className="label">Target Multiplier</div>
                  <input
                    type="number"
                    value={targetMultiplier}
                    onChange={({ target }) => setTargetMultiplier(target.value)}
                  />
                </div>

                <div className="icon gives">
                  <svg
                    viewBox="0 0 29 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.03931 9.94641L24.8765 9.94641"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.1889 1.54495L26.5903 9.94637L18.1889 18.3478"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="form-group">
                  <div className="label">Profit on win</div>
                  <input
                    type="number"
                    readOnly
                    value={profitOnWin}
                    onChange={({ target }) => console.log(target.value)}
                  />
                </div>
              </div>

              <Row className="info">
                <Col md={5} xl={3} className="col-6 form-group">
                  <div className="label">Win Chance</div>
                  <div className="label values">{winChance}%</div>
                </Col>
                <Col md={7} xl={9} className="col-6 form-group">
                  <div className="label">Max Profit</div>
                  <div className="label values profit">
                    <img src={btcIcon} />
                    19.28
                  </div>
                </Col>
              </Row>

              <Row className="roll">
                <Col lg={8} xl={6} className="col-10">
                  <button
                    disabled={targetMultiplier < 2}
                    onClick={rollDice}
                    className="primary-btn"
                  >
                    {targetMultiplier < 1.01
                      ? "Target multiplier too low!"
                      : "Roll Dice"}
                  </button>
                </Col>
              </Row>
            </div>
          </div>
          <Rollers />
        </div>
      </Layout>
    </div>
  );
}

const playsTabs = [
  { id: 0, name: "manual", label: "Manual" },
  //{ id: 1, name: 'script', label: 'Script' }
];
