import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Row, Col } from "react-bootstrap";
import refreshIcon from "../../assets/imgs/refresh-2.svg";
import "./style.scss";
import Chart from "./Chart";
import { notify, api } from "../../util";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export default function Player() {
  const params = useParams();
  const { username } = params;
  const [autoupdate, setAutoupdate] = useState(true);
  const [loading, setLoading] = useState(true);

  const [wageredUsd, setWageredUsd] = useState(0);
  const [profitUsd, setProfitUsd] = useState(0);
  const [totalBets, setTotalBets] = useState(0);
  const [bets, setBets] = useState([]);
  const [profitATH, setProfitATH] = useState(0);
  const [profitATL, setProfitATL] = useState(0);

  const stopAutoUpdate = () => {
    setAutoupdate(true);

    setTimeout(() => {
      setAutoupdate(false);
    }, 2000);
  };
  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const statistics = await api.get(`/account/statistics/${username}`);
        setTotalBets(statistics.total_count);
        setProfitUsd(statistics.profit_usd);
        setWageredUsd(statistics.wager_usd);

        const bets = statistics.bets;
        let totalProfit = 0;
        
        let AllTimeHigh = -999999999;
        let AllTimeLow =   999999999;
        
        for (let i = 0; i < bets.length; i++) {
          totalProfit = totalProfit + parseFloat(bets[i].profit_usd);
          if (totalProfit > AllTimeHigh) AllTimeHigh = totalProfit;
          else if (totalProfit < AllTimeLow) AllTimeLow = totalProfit;

          bets[i].netProfit_usd = totalProfit;
        }
        if(AllTimeHigh !== -999999999) setProfitATH(AllTimeHigh);
        if(AllTimeLow !== 999999999) setProfitATL(AllTimeLow);



        setBets(bets);
        /*const filteredMessages = messages.filter((message) => {
              return !userMutes[message.userId];
            });*/
        setLoading(false);
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    loadStatistics();
  }, []);

  return (
    <div className="player">
      <Layout history={false} title={`Player: ${username}`}>
        <div className="player-box">
          <Row className="stats justify-content-between">
            <Col md={2} className="col-4 form-group">
              <div className="label">Wagered</div>
              <span>
                {loading ? (
                  <Skeleton variant="text" height={80} animation="wave" />
                ) : (
                  parseFloat(wageredUsd).toFixed(2) + "$"
                )}{" "}
              </span>
            </Col>
            <Col md={2} className="col-4 form-group">
              <div className="label">Profit</div>
              <span>
                {loading ? (
                  <Skeleton variant="text" height={80} animation="wave" />
                ) : (
                  parseFloat(profitUsd).toFixed(2) + "$"
                )}{" "}
              </span>
            </Col>
            <Col md={2} className="col-4 form-group">
              <div className="label">Profit ATL</div>
              <span>
                {loading ? (
                  <Skeleton variant="text" height={80} animation="wave" />
                ) : (
                  parseFloat(profitATL).toFixed(2) + "$"
                )}
              </span>
            </Col>
            <Col md={2} className="col-4 form-group">
              <div className="label">Profit ATH</div>
              <span>
                {" "}
                {loading ? (
                  <Skeleton variant="text" height={80} animation="wave" />
                ) : (
                  parseFloat(profitATH).toFixed(2) + "$"
                )}
              </span>
            </Col>
            <Col md={2} className="col-8 form-group">
              <div className="label">Bets</div>
              <span>
                {loading ? (
                  <Skeleton variant="text" height={80} animation="wave" />
                ) : (
                  totalBets
                )}
              </span>
            </Col>
          </Row>
          <Row className="profit">
            <Col className="mt-2">
              <h4>Net profit over time</h4>
            </Col>

            <Col className="mt-2">
              <div className="options">
                <button>Tip {username}</button>
                <button>Add {username} as friend</button>
                {/*<button>Ignore {username}</button>*/}
              </div>
            </Col>

            <Col className="mt-2">
              <div className="auto-update" onClick={stopAutoUpdate}>
                <img
                  src={refreshIcon}
                  className={autoupdate ? "refresh-active" : ""}
                />
                <span>Stop automatic update</span>
              </div>
            </Col>
          </Row>
          <Chart bets={bets} />
        </div>
      </Layout>
    </div>
  );
}
