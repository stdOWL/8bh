import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api, notify } from "../../util";
import TextField from "@mui/material/TextField";
import { useCountUp } from "react-countup";

export default function ScriptRunner({
  code,
  gameResult,
  setGameResult,
  animationEnabled,
  setPreviousMultiplier,
}) {
  const iframe = useRef();
  console.log("ScriptRunner", code);
  const [logs, setLogs] = useState("");

  const { username, selectedAssetCode, currencies } = useSelector(
    ({ user }) => ({
      username: user ? user.username : null,
      selectedAssetCode: user ? user.selectedAssetCode : null,
      currencies: user ? user.balances : [],
    })
  );

  const sendResponse = (id, payload) => {
    iframe.current &&
      iframe.current.contentWindow.postMessage({ id, payload }, "*");
  };
  const sendEvent = (event, payload) => {
    iframe.current &&
      iframe.current.contentWindow.postMessage(
        {
          event,
          payload,
        },
        "*"
      );
  };

  const setClientSeed = (clientSeed, requestId) => {
    const fetchClientSeed = async () => {
      try {
        const response = await api.post("/bet/setDiceClientSeed", {
          clientSeed,
        });
        if (response.error) {
          setLogs(logs + "\n" + response.error);
        } else {
          sendResponse(requestId, response);
        }
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    fetchClientSeed();
  };

  const bet = (wager, target, requestId) => {
    const loadBets = async () => {
      try {
        const response = await api.post("/bet/betDice", {
          wager,
          target,
          asset_code: selectedAssetCode,
        });
        if (response.error) {
          setLogs(logs + "\n" + response.error);
        } else {
          setPreviousMultiplier(gameResult);

          setGameResult(
            (response.bet.multiplier / 100).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );
          setTimeout(() => {
            sendResponse(requestId, response.bet);
          }, animationEnabled ? 1100 : 100);


        }
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };

    loadBets();
  };
  const newSeedPair = (requestId) => {
    const fetchDiceServerSeed = async () => {
      try {
        const response = await api.get("/bet/revealDiceServerSeed");
        if (response.error) {
          setLogs(logs + "\n" + response.error);
        } else {
          sendResponse(requestId, {
            server_seed_hash: response.serverSeedHash,
            prev_server_seed: response.previousServerSeed,
            prev_client_seed: response.previousClientSeed,
          });
        }
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    fetchDiceServerSeed();
  };
  const onScriptMessage = ({ data: { id, type, payload } }) => {
    switch (type) {
      case "init": {
        let selectedCurrency = currencies.find(
          (s) => s.code === selectedAssetCode
        );
        sendResponse(id, {
          balance: selectedCurrency.balance,
          bankroll: 10000,
          script: code,
          uname: username,
          currency: selectedAssetCode,
        });
        break;
      }
      case "newSeedPair": {
        newSeedPair(id);

        break;
      }
      case "setClientSeed": {
        setClientSeed(payload, id);
        break;
      }
      case "bet": {
        bet(payload.wager, payload.target, id);
        break;
      }
      case "log": {
        setLogs(logs + "\n" + payload);
        sendResponse(id);
        break;
      }
      default: {
      }
    }
  };
  useEffect(() => {
    window.addEventListener("message", onScriptMessage, {
      passive: !0,
    });
    return () => {
      window.removeEventListener("message", onScriptMessage);
    };
  });
  return (
    <>
      <TextField
        id="filled-textarea"
        label="Logs"
        value={logs}
        multiline
        rows={10}
        sx={{ width: 1 }}
        variant="filled"
        inputProps={{
          style: {
            color: "white",
          },
        }}
      />
      <iframe
        src="/script_runner.html"
        sandbox="allow-scripts"
        title="W3Schools Free Online Web Tutorials"
        ref={iframe}
      ></iframe>
    </>
  );
}
