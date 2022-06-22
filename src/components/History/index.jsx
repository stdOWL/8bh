import React, { useState, useEffect } from "react";
import { Table, Image } from "react-bootstrap";
import { history } from "./data";
import "./style.scss";
import Skeleton from "@mui/material/Skeleton";
import { useImmer } from "use-immer";
import { defaultSocket } from "../../lib/sockets";
import { notify, api } from "../../util";

export default function History() {
  const redirectExplorer = (explorerAddress, value) => {
    if(!explorerAddress || !value) return;
    let url = explorerAddress.replace('$1',value);
    window.open(url);
  };
  const [loading, setLoading] = useState(true);
  const [history, updateHistory] = useImmer([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const histories = await api.get("/wallet/history/all");

        updateHistory(() => histories);
        setLoading(false);
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    const onMessage = (message) => {
      updateHistory((messages) => {
        messages.push(message);
      });
    };
    loadHistory();
    defaultSocket._socket.on("wallet_history", onMessage);

    return () => {
      defaultSocket._socket.off("wallet_history", onMessage);
    };
  }, []);
  return (
    <div className="history">
      <h4>History</h4>
      <div className="history-box">
        <Table responsive borderless>
            
          <thead>
            <tr>
              <th>Network</th>
              <th>Type</th>
              <th>Value</th>
              <th>Status</th>
              <th>Address</th>
              <th>Transaction</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? [...Array(10)].map((x, i) => (
                  <tr key={i}>
                    <td>
                      <Skeleton variant="text" />
                    </td>
                    <td>
                      <Skeleton variant="text" />
                    </td>
                    <td>
                      <Skeleton variant="text" />
                    </td>
                    <td>
                      <Skeleton variant="text" />
                    </td>
                    <td>
                      <Skeleton variant="text" />
                    </td>
                    <td>
                      <Skeleton variant="text" />
                    </td>
                  </tr>
                ))
              : history.map((his, index) => (
                  <tr key={index}>
                    <td>
                      <div className="firstseen">
                        <span>{his.asset_name} - {his.network_name}</span>
                        <span className="date">{his.created_at}</span>
                      </div>
                    </td>
                    <td className={`history-type-${his.type.toLowerCase()}`}>{his.type}</td>
                    <td className="value">
                      {parseFloat(his.amount).toFixed(4)}
                      <Image
                        src={"/currencies/" + his.asset_code + ".png"}
                        alt={his.asset_name}
                      />
                    </td>
                    <td className={`text-${his.status.toLowerCase()}`}>
                      {his.status}
                    </td>
                    <td className="address"
                    onClick={() =>  redirectExplorer(his.explorer_address,his.address)}
                    >{his.address
                        ? his.address.substring(0, 5) +
                          ".." +
                          his.address.substring(
                            his.address.length - 2,
                            his.address.length
                          )
                        : ""}</td>
                    <td
                      className="transaction"
                      onClick={() => redirectExplorer(his.explorer_tx,his.tx_id)}
                    >
                      {his.tx_id
                        ? his.tx_id.substring(0, 5) +
                          ".." +
                          his.tx_id.substring(
                            his.tx_id.length - 2,
                            his.tx_id.length
                          )
                        : ""}
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
