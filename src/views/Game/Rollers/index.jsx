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
import { defaultSocket } from "../../../lib/sockets";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Rollers() {
  const navigate = useNavigate();
  const { LOGGED_IN, username } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    username: user ? user.username : null,
  }));
  const [showRollers, setShowRollers] = useState("all");
  const [allBets, updateAllBets] = useImmer(() => []);
  const [highrollers, updateHighrollers] = useImmer(() => []);
  const [myBets, updateMyBets] = useImmer(() => []);

  React.useEffect(() => {
    if (showRollers === "me" && LOGGED_IN) {
      const loadBets = async () => {
        try {
          const { my } = await api.get("/bet/getRecentMyBetHistory");
          updateMyBets(() => my.slice(0, 8));
        } catch (err) {
          notify.error(err.response ? err.response.data : err.message);
        }
      };
      loadBets();
    } else {
      const loadBets = async () => {
        try {
          const { all, highrollers } = await api.get(
            "/bet/getRecentBetHistory"
          );
          updateAllBets(() => all.slice(0, 8));
          updateHighrollers(() => highrollers.slice(0, 8));
        } catch (err) {
          notify.error(err.response ? err.response.data : err.message);
        }
      };
      loadBets();
    }
  }, [showRollers, updateAllBets, updateHighrollers]);
  const formatMultiplier = (e) => {
    return (parseInt(e) / 100).toLocaleString("en", {
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 5,
    });
  };

  const filteredBets = () => {
    if (showRollers === "all") return allBets;
    else if (showRollers === "me") return myBets;
    return highrollers;
  };
  React.useEffect(() => {
    const onNewbet = (message) => {
      updateAllBets((messages) => {
        messages.unshift(message);

        if (messages.length > 8) {
          messages.length = 8;
        }
      });
      if (Math.abs(message.profit_usd) > 100) {
        updateHighrollers((messages) => {
          messages.unshift(message);

          if (messages.length > 8) {
            messages.length = 8;
          }
        });
      }
      if (LOGGED_IN && message.username === username) {
        updateMyBets((messages) => {
          messages.unshift(message);

          if (messages.length > 8) {
            messages.length = 8;
          }
        });
      }
    };

    defaultSocket._socket.on("new_bet", onNewbet);

    return () => {
      defaultSocket._socket.off("new_bet", onNewbet);
    };
  });

  return (
    <div className="rollers">
      <ScrollContainer className="tabs">
        <div
          key={0}
          onClick={() => setShowRollers("all")}
          className={`tab ${showRollers === "all" ? "active" : null}`}
        >
          All
        </div>
        <div
          key={1}
          onClick={() => setShowRollers("high-rollers")}
          className={`tab ${showRollers === "high-rollers" ? "active" : null}`}
        >
          High Rollers
        </div>
        {LOGGED_IN && (
          <div
            key={2}
            onClick={() => setShowRollers("me")}
            className={`tab ${showRollers === "me" ? "active" : null}`}
          >
            My Bets
          </div>
        )}
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
                {filteredBets().map((roller, index) => (
                  <tr key={index}>
                    <td className="playerLink" onClick={() => navigate(`/Player/${roller.username}`)}>{roller.username}</td>
                    <td className="value">
                      {parseFloat(roller.wager).toFixed(4)}
                      <Image
                        src={"/currencies/" + roller.asset_code + ".png"}
                        alt={roller.asset_code}
                      />
                    </td>
                    <td>{formatMultiplier(roller.target)}x</td>
                    <td>{formatMultiplier(roller.multiplier)}x</td>
                    <td className={`text-${roller.isWin ? "profit" : "loss"}`}>
                      {parseFloat(roller.profit) < 0 ? "" : "+"}
                      {parseFloat(roller.profit).toFixed(4)}
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

const rollersTabs = [
  { id: 0, name: "all", label: "All" },
  { id: 1, name: "high-rollers", label: "High Rollers" },
  { id: 2, name: "me", label: "My Bets" },
];
