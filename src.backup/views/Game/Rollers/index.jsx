import React, { useState } from "react";
import ethIcon from "../../../assets/imgs/eth.png";
import btcIcon from "../../../assets/imgs/btc.png";
import xrpIcon from "../../../assets/imgs/xrp.svg";
import bnbIcon from "../../../assets/imgs/bnb.png";
import usdtIcon from "../../../assets/imgs/usdt.png";
import ScrollContainer from "react-indiana-drag-scroll";
import { Row, Col, Table, Image } from "react-bootstrap";
import "./style.scss";
import { useImmer } from "use-immer";
import { notify, api } from "../../../util";

export default function Rollers() {
  const [showRollers, setShowRollers] = useState("all");
  const [bets, updateBets] = useImmer(() => []);

  React.useEffect(() => {
    const loadBets = async () => {
      try {
        const { all, highrollers } = await api.get("/bet/getRecentBetHistory");
        updateBets(() => highrollers.slice(0, 8));
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    loadBets();
  }, [showRollers, updateBets]);

  return (
    <div className="rollers">
      <ScrollContainer className="tabs">
        {rollersTabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setShowRollers(tab.name)}
            className={`tab ${showRollers === tab.name ? "active" : null}`}
          >
            {tab.label}
          </div>
        ))}
      </ScrollContainer>
      <div className="rollers-box">
        <Row className="justify-content-center">
          <Col xl={10}>
            <Table responsive borderless>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Wager</th>
                  <th>Target</th>
                  <th>Outcome</th>
                  <th>Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {false &&
                  bets.map((roller, index) => (
                    <tr key={index}>
                      <td>{roller.player}</td>
                      <td className="value">
                        {roller.wager.amount.toLocaleString()}
                        <Image
                          src={roller.wager.icon}
                          alt={roller.wager.coin}
                        />
                      </td>
                      <td>{roller.target}x</td>
                      <td>{roller.outcome}x</td>
                      <td className={`text-${roller.profit.type}`}>
                        {roller.profit.type === "loss" ? "-" : "+"}{" "}
                        {roller.profit.amount.toFixed(6)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const data = [
  {
    player: "mmarkel1",
    wager: { amount: 4000, coin: "BTC", icon: btcIcon },
    target: 46.5,
    outcome: 57.34,
    profit: { type: "profit", amount: 0.135 },
  },
  {
    player: "mmarkel1",
    wager: { amount: 4000, coin: "BTC", icon: ethIcon },
    target: 46.5,
    outcome: 57.34,
    profit: { type: "loss", amount: 0.135 },
  },
  {
    player: "mmarkel1",
    wager: { amount: 4000, coin: "USDT", icon: usdtIcon },
    target: 46.5,
    outcome: 57.34,
    profit: { type: "profit", amount: 0.135 },
  },
  {
    player: "mmarkel1",
    wager: { amount: 4000, coin: "BTC", icon: bnbIcon },
    target: 46.5,
    outcome: 57.34,
    profit: { type: "profit", amount: 0.135 },
  },
  {
    player: "mmarkel1",
    wager: { amount: 4000, coin: "BTC", icon: btcIcon },
    target: 46.5,
    outcome: 57.34,
    profit: { type: "loss", amount: 0.135 },
  },
  {
    player: "mmarkel1",
    wager: { amount: 4000, coin: "BTC", icon: xrpIcon },
    target: 46.5,
    outcome: 57.34,
    profit: { type: "loss", amount: 0.135 },
  },
  {
    player: "mmarkel1",
    wager: { amount: 4000, coin: "BTC", icon: btcIcon },
    target: 46.5,
    outcome: 57.34,
    profit: { type: "profit", amount: 0.135 },
  },
  {
    player: "mmarkel1",
    wager: { amount: 4000, coin: "BTC", icon: btcIcon },
    target: 46.5,
    outcome: 57.34,
    profit: { type: "loss", amount: 0.135 },
  },
];

const rollersTabs = [
  { id: 1, name: "all", label: "All" },
  { id: 0, name: "high-rollers", label: "High Rollers" },
];
