import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import ethIcon from "../../assets/imgs/eth.png";
import btcIcon from "../../assets/imgs/btc.png";
import TipModel from "../../components/TipModel";
import Rollers from "./Rollers";
import Slider from "./Slider";
import Title from "./Title";
import Layout from "../../components/Layout";
import ScriptRunner from "../../components/ScriptRunner";
import SeedManagement from "../../assets/imgs/seed management.png";
import AnimationDisabled from "../../assets/imgs/animation_disabled.png";
import AnimationEnabled from "../../assets/imgs/animation_enabled.png";
import { DebounceInput } from "react-debounce-input";

import Refresh from "../../assets/imgs/refresh.png";
import "./style.scss";
import { useLayout } from "../../components/Layout/context/layoutContext";
import curvyLine from "../../assets/imgs/curvyLine.svg";
import { api, notify } from "../../util";
//import CountUp from "react-countup";
import { useCountUp } from "react-countup";
import { useSelector } from "react-redux";
import WarningIcon from "@mui/icons-material/Warning";
import CasinoIcon from "@mui/icons-material/Casino";
import CodeEditor from "@uiw/react-textarea-code-editor";
import extract from "extract-json-from-string";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useImmer } from "use-immer";
import AffiliateModel from "../../components/AffiliateModel";

const SCRIPT_MODE_EDIT = 0;
const SCRIPT_MODE_START = 1;
const SCRIPT_MODE_RUN = 2;
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Game() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const [activeHover, setActiveHover] = useState("");

  const mouseIn = (node) => {
    setActiveHover(node);
  };
  const mouseOut = () => {
    setActiveHover("");
  };
  const [userSelectedClientSeed, setUserSelectedClientSeed] =
    React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setRandomClientSeed = () => {
    if (LOGGED_IN === false) {
      if (!loginModalShow) setLoginModalShow(true);
      return;
    }

    const fetchDiceServerSeed = async () => {
      try {
        const response = await api.post("/bet/setDiceClientSeed", {
          clientSeed: userSelectedClientSeed,
        });

        if (response.error) {
          notify.error(response.error);
          return;
        }
        setSeedInfo((d) => {
          return {
            ...d,
            ...response,
          };
        });
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      } finally {
        setBusy(false);
      }
    };
    setBusy(true);
    fetchDiceServerSeed();
  };

  const revealServerSeed = () => {
    if (LOGGED_IN === false) {
      if (!loginModalShow) setLoginModalShow(true);
      return;
    }

    const fetchDiceServerSeed = async () => {
      try {
        const response = await api.get("/bet/revealDiceServerSeed");

        if (response.error) {
          notify.error(response.error);
          return;
        }
        setSeedInfo((d) => {
          return {
            ...d,
            ...response,
          };
        });
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      } finally {
        setBusy(false);
      }
    };
    setBusy(true);
    fetchDiceServerSeed();
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const countUpRef = React.useRef(null);

  const { openChat, setLoginModalShow, loginModalShow } = useLayout();

  const navigate = useNavigate();
  const searchParams = useQuery();
  const [rollError, setRollError] = useState(null);

  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [hotkeyEnabled, setHotkeyEnabled] = useState(true);

  const [statistics, setStatistics] = useState({
    wagers: 0,
    profit: 0,
    game_count: 0,
    win_count: 0,
  });

  const [busy, setBusy] = useState(false);

  const [seedInfo, setSeedInfo] = useImmer({
    clientSeed: "stormy abrasive dinner",
    nonce: 1,
    serverSeedHash:
      "d09fa354c20133ea19fd48fd96e8f768c83710de196a6e91aef947528b8fc3d2",
    previousServerSeed:
      "e720a08699d24a196eb5bc91f3b786750cd67d9837ab9f02d75d2f26310675cc_32ec943b24ca7bc7c2711a823fc373c2e2b3d301b9da23929a7be120c881a639",
    previousClientSeed: "laughable red board",
  });

  const [countdownClass, setCountdownClass] = useState("countdown-progress");
  const [targetMultiplier, setTargetMultiplier] = useState(2.0);
  const [wager, setWager] = useState(0.1);
  const [winChance, setWinChange] = useState("0.1");
  const [profitOnWin, setProfitOnWin] = useState("0.1");
  const [gameResult, setGameResult] = useState("1.00");
  const [previousMultiplier, setPreviousMultiplier] = useState("0.00");
  const [scriptState, setScriptState] = useState(SCRIPT_MODE_EDIT);

  const [configs, setConfigs] = useState([]);

  const [code, setCode] = React.useState(
    `var config = {
      clientSeed: { label: "Client seed", type: "text", value: "This is my new client seed." }
  }
  
  
  // This script assumes that the current seed pair is already used, i.e. that bets have been placed
  // with it. It will fail if the current seed pair is unused.
  
  // request a new server seed using a random client seed
  const { server_seed_hash } = await this.newSeedPair()
  await this.log("The new server seed has the hash:", server_seed_hash)
  
  // set the client seed
  await this.setClientSeed(config.clientSeed.value)
  await this.log("The client seed was set to:", config.clientSeed.value)
  `
  );

  useEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 32:
        // space
        if (hotkeyEnabled) {
          var elem = event.target.nodeName;
          debugger;
          if (elem !== "TEXTAREA" && elem !== "INPUT") {
            if (!busy) rollDice();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
        }

        break;
      default:
        break;
    }
  });
  useEffect(() => {
    if (Number.isNaN(wager)) setRollError("Wager invalid!");
    else if (wager <= 0) setRollError("Wager too low!");
    else if (targetMultiplier < 1.01)
      setRollError("Target multiplier too low!");
    else {
      setRollError(null);
      let win = ((1 - 0.01) / targetMultiplier) * 100;
      setWinChange(
        win.toLocaleString("en", {
          minimumSignificantDigits: 1,
          maximumSignificantDigits: 3,
        })
      );
      setProfitOnWin((wager * (targetMultiplier - 1)).toFixed(8));
    }
  }, [targetMultiplier, wager]);

  const countdownStarted = () => {
    console.log("countdownStarted", animationEnabled);
    if (animationEnabled) setCountdownClass("countdown-progress");
  };
  const countdownFinished = () => {
    console.log("countdownFinished", targetMultiplier, gameResult);
    if (animationEnabled) {
      if (parseFloat(targetMultiplier) > parseFloat(gameResult))
        setCountdownClass("countdown-lose");
      else setCountdownClass("countdown-win");

      setBusy(false);
    }
  };
  const searchPlay = searchParams.get("play");
  const { start, pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    start: previousMultiplier,
    end: gameResult,
    duration: animationEnabled ? 1 : 0,
    decimals: 2,
    suffix: "X",
    preserveValue: true,
    onStart: () => countdownStarted(),
    onEnd: () => countdownFinished(),
  });
  const { LOGGED_IN, selectedAssetCode, currencies } = useSelector(
    ({ user }) => ({
      LOGGED_IN: !!user,
      selectedAssetCode: user ? user.selectedAssetCode : null,
      currencies: user ? user.balances : [],
    })
  );

  useEffect(() => {
    let selectedCurrency = currencies.find((s) => s.code === selectedAssetCode);
    if (selectedCurrency) {
      setWager(
        parseFloat(selectedCurrency.min_wager).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        })
      );
    }
  }, [selectedAssetCode]);

  const showSeedManagment = () => {
    setOpen(true);
  };
  const resetStatistics = () => {
    if (LOGGED_IN === false) {
      if (!loginModalShow) setLoginModalShow(true);
      return;
    }

    const fetchResetStatistics = async () => {
      try {
        const response = await api.get("/bet/resetDiceStatistics");

        if (response.error) {
          notify.error(response.error);
          return;
        }
        setStatistics({
          wagers: 0,
          profit: 0,
          game_count: 0,
          win_count: 0,
        });
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      } finally {
        setBusy(false);
      }
    };
    setBusy(true);
    fetchResetStatistics();
  };
  const skipBet = () => {
    if (LOGGED_IN === false) {
      if (!loginModalShow) setLoginModalShow(true);
      return;
    }

    setPreviousMultiplier(gameResult);
    const fetchSkipBet = async () => {
      try {
        const response = await api.get("/bet/skipDice");

        if (response.error) {
          notify.error(response.error);
          return;
        }
        setSeedInfo((d) => {
          return {
            ...d,
            nonce: response.nonce,
          };
        });
        setGameResult(
          (response.multiplier / 100).toLocaleString("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      } finally {
        if (!animationEnabled) setBusy(false);
      }
    };
    setBusy(true);
    fetchSkipBet();
  };
  const rollDice = () => {
    if (LOGGED_IN === false) {
      if (!loginModalShow) setLoginModalShow(true);
      return;
    }

    setPreviousMultiplier(gameResult);
    const loadBets = async () => {
      try {
        const response = await api.post("/bet/betDice", {
          wager,
          target: parseInt(parseFloat(targetMultiplier) * 100),
          asset_code: selectedAssetCode,
        });

        if (response.error) {
          if (response.error === "NOT_ENOUGH_BALANCE")
            notify.error("Your balance is not enough, please deposit.");
          else notify.error(response.error);
          return;
        }

        setSeedInfo((d) => {
          return {
            ...d,
            nonce: response.nonce,
          };
        });

        setStatistics(response.statistics);
        setGameResult(
          (response.bet.multiplier / 100).toLocaleString("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      } finally {
        setBusy(false);
      }
    };
    setBusy(true);
    loadBets();
  };
  const handleActivePlay = (tab) => {
    navigate(`?play=${tab}`);
  };
  const parseConfig = (configValues) => {
    //console.log("parseConfig", configValues);
    let configsParsed = [];
    let keys = Object.keys(configValues);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let config = configValues[key];
      config.key = key;
      configsParsed.push(config);
    }

    setConfigs(configsParsed);
  };

  const updateConfig = (key, value) => {
    setConfigs((prevState) =>
      prevState.map((s) => (s.key === key ? { ...s, value } : s))
    );
  };

  const validateWager = (wager) => {
    const fWager = parseFloat(wager);
    let selectedCurrency = currencies.find((s) => s.code === selectedAssetCode);
    if (selectedCurrency) {
      if (
        isNaN(fWager) ||
        fWager <= 0 ||
        fWager < parseFloat(selectedCurrency.min_wager)
      ) {
        return parseFloat(selectedCurrency.min_wager).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        });
      }
    }
    return fWager.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });
  };

  const findConfig = (jsonObjects) => {
    if (jsonObjects.length === 0 || code.indexOf("var config") === -1) {
      setConfigs([]);
      return;
    }
    for (let i = 0; i < jsonObjects.length; i++) {
      let jsonObject = jsonObjects[i];
      let jsonObjectKeys = Object.keys(jsonObject);
      for (let k = 0; k < jsonObjectKeys.length; k++) {
        let jsonObjectKey = jsonObjectKeys[k];
        let subKeys = Object.keys(jsonObject[jsonObjectKey]);

        if (subKeys.includes("label") && subKeys.includes("type")) {
          parseConfig(jsonObject);
          return;
        }
      }
    }
  };

  useEffect(() => {
    start();
    if (!animationEnabled) {
      if (parseFloat(targetMultiplier) > parseFloat(gameResult))
        setCountdownClass("countdown-lose");
      else setCountdownClass("countdown-win");
    }
  }, [gameResult]);

  useEffect(() => {
    const filtredplays = playsTabs.filter((p) => p.name === searchPlay);

    if (!filtredplays.length) navigate(`?play=manual`);
  }, [searchPlay]);
  useEffect(() => {
    if (scriptState === SCRIPT_MODE_START) {
      var codeWithoutComments = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
      let jsonObjects = extract(codeWithoutComments);
      findConfig(jsonObjects);
    }
  }, [scriptState]);
  useEffect(() => {
    const loadInfo = async () => {
      try {
        const diceInfo = await api.get("/bet/diceInfo");
        if (diceInfo.lastBet) {
          setSeedInfo((d) => {
            return { ...d, ...diceInfo.seedInfo };
          });
          setWager(
            parseFloat(diceInfo.lastBet.wager).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            })
          );
          setTargetMultiplier(parseFloat(diceInfo.lastBet.target) / 100);
          setGameResult(
            (diceInfo.lastBet.multiplier / 100).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );
        }
      } catch (err) {
        notify.error(err.response ? err.response.data : err.message);
      }
    };
    if (LOGGED_IN) loadInfo();
  }, [LOGGED_IN]);

  return (
    <div className="game-container">
      {
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#1A1A1B",
            },
          }}
        >
          <DialogTitle className="seed-managment-title">
            Seed management
          </DialogTitle>
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
              }}
            >
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                id="filled-required"
                label="Previous server seed"
                value={seedInfo.previousServerSeed}
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "white",
                  },
                }}
                focused
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                id="filled-required"
                label="Previous client seed"
                value={seedInfo.previousClientSeed}
                variant="filled"
                focused
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "white",
                  },
                }}
              />

              <Divider
                sx={{
                  mt: "10px",
                  mb: "10px",
                }}
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                id="filled-required"
                label="Server seed hash"
                value={seedInfo.serverSeedHash}
                variant="filled"
                focused
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "white",
                  },
                }}
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                id="filled-required"
                label="Client seed"
                value={seedInfo.clientSeed}
                variant="filled"
                focused
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "white",
                  },
                }}
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                id="filled-required"
                label="Next nonce"
                value={seedInfo.nonce}
                variant="filled"
                focused
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "white",
                  },
                }}
              />
              {seedInfo.nonce < 2 && (
                <>
                  <Divider
                    sx={{
                      mt: "10px",
                      mb: "10px",
                    }}
                  />
                  <TextField
                    fullWidth
                    id="filled-required"
                    label="New client seed"
                    value={userSelectedClientSeed}
                    onChange={({ target }) =>
                      setUserSelectedClientSeed(target.value)
                    }
                    placeholder="random if empty"
                    variant="filled"
                    focused
                  />
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            {seedInfo.nonce < 2 ? (
              <Button onClick={setRandomClientSeed} autoFocus>
                Set client seed
              </Button>
            ) : (
              <Button onClick={revealServerSeed} autoFocus>
                Reveal Server Seed
              </Button>
            )}

            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      }
      <Layout title={null} history={false}>
        <div className="shapes-group" />
        <Row className="game-title justify-content-center">
          <Col md={6} lg={openChat ? 5 : 4} className="col-8 box">
            <h1 className={countdownClass + " mx-auto"}>
              <span ref={countUpRef}></span>
              <img src={curvyLine} />
            </h1>
          </Col>
        </Row>
        <div className="icon-wraps">
          <div className="d-flex row-gap pb-2 gap-2 icon-wrapper">
            <div className="position-relative pointer">
              <div
                className={`position-absolute hover-tip hover-tip-2 ${
                  activeHover === "disable" ? "block" : "d-none"
                }`}
              >
                {animationEnabled ? "Disable Animation" : "Enable Animation"}{" "}
                {/* Disable Animation */}
              </div>
              <img
                onClick={() => {
                  setAnimationEnabled(!animationEnabled);
                }}
                className="icon"
                onMouseEnter={() => mouseIn("disable")}
                onMouseLeave={mouseOut}
                src={animationEnabled ? AnimationEnabled : AnimationDisabled}
                alt=""
              />
            </div>
            <div className="position-relative pointer">
              <div
                className={`position-absolute hover-tip hover-tip-2 ${
                  activeHover === "seed" ? "block" : "d-none"
                }`}
              >
                Seed Managment
              </div>
              <img
                onClick={showSeedManagment}
                className="icon"
                onMouseEnter={() => mouseIn("seed")}
                onMouseLeave={mouseOut}
                src={SeedManagement}
                alt=""
              />
            </div>

            <div className="position-relative pointer">
              <div
                className={`position-absolute hover-tip hover-tip-2 ${
                  activeHover === "reset" ? "block" : "d-none"
                }`}
              >
                Reset Statistics
              </div>
              <img
                onClick={resetStatistics}
                className="icon"
                onMouseEnter={() => mouseIn("reset")}
                onMouseLeave={mouseOut}
                src={Refresh}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="game">
          <div className="play-box">
            <ScrollContainer className="tabs d-flex justify-content-between">
              <div className="d-flex">
                {playsTabs.map((tab, index) => (
                  <div
                    key={index}
                    onClick={() => handleActivePlay(tab.name)}
                    className={`tab ${
                      searchPlay === tab.name ? "active" : null
                    }`}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
              <div className="icon-wraps2">
                <div className="d-flex row-gap pb-2 icon-wrapper">
                  <div className="position-relative pointer">
                    <div
                      className={`position-absolute hover-tip ${
                        activeHover === "seed" ? "block" : "d-none"
                      }`}
                    >
                      Seed Managment
                    </div>
                    <img
                      onClick={showSeedManagment}
                      className="icon"
                      onMouseEnter={() => mouseIn("seed")}
                      onMouseLeave={mouseOut}
                      src={SeedManagement}
                      alt=""
                    />
                  </div>
                  <div className="position-relative pointer">
                    <div
                      className={`position-absolute hover-tip ${
                        activeHover === "disable" ? "block" : "d-none"
                      }`}
                    >
                      {animationEnabled
                        ? "Disable Animation"
                        : "Enable Animation"}{" "}
                      {/* Disable Animation */}
                    </div>
                    <img
                      onClick={() => {
                        setAnimationEnabled(!animationEnabled);
                      }}
                      className="icon"
                      onMouseEnter={() => mouseIn("disable")}
                      onMouseLeave={mouseOut}
                      src={
                        animationEnabled ? AnimationEnabled : AnimationDisabled
                      }
                      alt=""
                    />
                  </div>
                  <div className="position-relative pointer">
                    <div
                      className={`position-absolute hover-tip ${
                        activeHover === "reset" ? "block" : "d-none"
                      }`}
                    >
                      Reset Stats
                    </div>
                    <img
                      onClick={resetStatistics}
                      className="icon"
                      onMouseEnter={() => mouseIn("reset")}
                      onMouseLeave={mouseOut}
                      src={Refresh}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </ScrollContainer>
            <TipModel />
            {searchPlay === "script" ? (
              <div className="game-box">
                <div className="calcs">
                  <div className="custom-input">
                    <div className="label">Script</div>
                    {scriptState === SCRIPT_MODE_START &&
                      configs.map((config, index) => {
                        if (config.type === "text")
                          return (
                            <TextField
                              focused
                              sx={{ width: 1, mb: 2 }}
                              inputProps={{
                                style: {
                                  color: "white",
                                },
                              }}
                              id="outlined-name"
                              label={config.label}
                              value={config.value}
                              onChange={({ target }) =>
                                updateConfig(config.key, target.value)
                              }
                            />
                          );
                        if (config.type === "multiplier")
                          return (
                            <TextField
                              focused
                              sx={{ width: 1, mb: 2 }}
                              id="outlined-name"
                              type="number"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                style: {
                                  color: "white",
                                },
                              }}
                              label={config.label}
                              value={config.value}
                              onChange={({ target }) =>
                                updateConfig(config.key, target.value)
                              }
                            />
                          );
                        if (config.type === "balance")
                          return (
                            <div className="form-group">
                              <div className="label">{config.label}</div>
                              <div className="custom-input">
                                <input
                                  type="number"
                                  value={config.value}
                                  onChange={({ target }) =>
                                    updateConfig(config.key, target.value)
                                  }
                                />
                                <div className="icons">
                                  <Image
                                    src={
                                      "/currencies/" +
                                      (selectedAssetCode || "btc") +
                                      ".png"
                                    }
                                    alt="selectedAssetCode"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        if (config.type === "checkbox")
                          return (
                            <FormControlLabel
                              sx={{ width: 1, mb: 2 }}
                              control={
                                <Checkbox
                                  checked={config.value}
                                  onChange={({ target }) =>
                                    updateConfig(config.key, target.checked)
                                  }
                                  name={config.label}
                                />
                              }
                              label={config.label}
                            />
                          );
                      })}
                    {scriptState === SCRIPT_MODE_EDIT && (
                      <CodeEditor
                        value={code}
                        language="js"
                        placeholder="Please enter JS code."
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{
                          fontSize: 12,
                          backgroundColor: "transparent",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          fontFamily:
                            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        }}
                      />
                    )}
                    {scriptState === SCRIPT_MODE_RUN && (
                      <ScriptRunner
                        gameResult={gameResult}
                        setPreviousMultiplier={setPreviousMultiplier}
                        animationEnabled={animationEnabled}
                        setGameResult={setGameResult}
                        code={code}
                      ></ScriptRunner>
                    )}
                  </div>
                </div>

                <Row className="roll">
                  <Col lg={8} xl={6} className="col-10">
                    {scriptState === SCRIPT_MODE_EDIT && (
                      <button
                        onClick={() => {
                          setScriptState(SCRIPT_MODE_START);
                        }}
                        className="primary-btn"
                      >
                        {" "}
                        Start
                      </button>
                    )}
                    {scriptState === SCRIPT_MODE_START && (
                      <button
                        onClick={() => {
                          setScriptState(SCRIPT_MODE_RUN);
                        }}
                        className="primary-btn"
                      >
                        {" "}
                        Run
                      </button>
                    )}

                    {scriptState === SCRIPT_MODE_RUN && (
                      <button
                        onClick={() => {
                          setScriptState(SCRIPT_MODE_EDIT);
                        }}
                        className="primary-btn"
                      >
                        {" "}
                        Stop
                      </button>
                    )}
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="game-box">
                {false && LOGGED_IN && (
                  <Row>
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                      sx={{
                        mb: "2rem",
                      }}
                    >
                      <Button
                        onClick={showSeedManagment}
                        sx={{
                          backgroundColor: "#2d2d30 !important",
                          borderColor: "#515156 !important",
                        }}
                      >
                        Seed Managment
                      </Button>
                      <Button
                        sx={{
                          backgroundColor: "#2d2d30 !important",
                          borderColor: "#515156 !important",
                        }}
                        onClick={resetStatistics}
                      >
                        Reset Stats
                      </Button>
                      <Button
                        sx={{
                          backgroundColor: "#2d2d30 !important",
                          borderColor: "#515156 !important",
                        }}
                        onClick={() => {
                          setAnimationEnabled(!animationEnabled);
                        }}
                      >
                        {animationEnabled
                          ? "Disable Animation"
                          : "Enable Animation"}{" "}
                      </Button>
                    </ButtonGroup>
                  </Row>
                )}
                <div className="calcs">
                  <div className="form-group">
                    <div className="label">Wager</div>
                    <div className="custom-input">
                      <DebounceInput
                        pattern="[0-9]*"
                        type="number"
                        value={wager}
                        debounceTimeout={1000}
                        onChange={({ target }) =>
                          setWager(validateWager(target.value))
                        }
                      />

                      <div className="icons">
                        <Image
                          src={
                            "/currencies/" +
                            (selectedAssetCode || "btc") +
                            ".png"
                          }
                          alt="selectedAssetCode"
                        />
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
                      pattern="[0-9]*"
                      value={targetMultiplier}
                      onChange={({ target }) =>
                        setTargetMultiplier(target.value)
                      }
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
                    <input type="number" readOnly value={profitOnWin} />
                  </div>
                </div>

                <Row className="roll mb-3 d-flex d-md-none">
                  <Col lg={8} xl={6} className="col-10">
                    <div className="input-group-append m-0">
                      <button
                        disabled={rollError || busy}
                        onClick={rollDice}
                        className="primary-btn roll-dice"
                      >
                        {rollError ? (
                          <>
                            <WarningIcon /> {rollError}
                          </>
                        ) : (
                          <>
                            <span>
                              <CasinoIcon /> Roll Dice
                            </span>
                          </>
                        )}
                      </button>
                      <button
                        disabled={rollError || busy}
                        onClick={skipBet}
                        className="btn btn-outline-secondary"
                        type="button"
                        style={{
                          width: "20%",
                        }}
                      >
                        Skip
                      </button>
                    </div>
                  </Col>
                </Row>

                <Row className="roll d-none d-md-flex">
                  <Col lg={8} xl={6} className="col-10">
                    <div className="input-group-append row">
                      <button
                        disabled={rollError || busy}
                        onClick={rollDice}
                        className="primary-btn roll-dice col-md-10"
                      >
                        {rollError ? (
                          <>
                            <WarningIcon /> {rollError}
                          </>
                        ) : (
                          <>
                            <span>
                              <CasinoIcon /> Roll Dice
                            </span>
                          </>
                        )}
                      </button>
                      <button
                        disabled={rollError || busy}
                        onClick={skipBet}
                        className="btn btn-outline-secondary col-md-2"
                        type="button"
                      >
                        Skip
                      </button>
                    </div>
                  </Col>
                </Row>

                {LOGGED_IN && (
                  <Row className="info">
                    <Col md={4} xl={2} className="col-6 form-group">
                      <div className="label">Win Chance</div>
                      <div className="label values">{winChance}%</div>
                    </Col>
                    <Col md={4} xl={2} className="col-6 form-group">
                      <div className="label">Max Profit</div>
                      <div className="label values profit">
                        <img src={btcIcon} />
                        1.928
                      </div>
                    </Col>
                    <Col md={4} xl={2} className="col-6 form-group">
                      <div className="label">Wagers</div>
                      <div className="label values">
                        {parseFloat(statistics.wagers).toFixed(2)} $
                      </div>
                    </Col>
                    <Col md={4} xl={2} className="col-6 form-group">
                      <div className="label">Profit</div>
                      <div className="label values">
                        {parseFloat(statistics.profit).toFixed(2)} $
                      </div>
                    </Col>
                    <Col md={4} xl={2} className="col-6 form-group">
                      <div className="label">Win Rate</div>
                      <div className="label values">
                        {(statistics.game_count === 0
                          ? 0
                          : (parseFloat(statistics.win_count) /
                              parseFloat(statistics.game_count)) *
                            100
                        ).toFixed(2)}{" "}
                        %
                      </div>
                    </Col>
                    <Col md={4} xl={2} className="col-6 form-group">
                      <div className="label">Luck</div>
                      <div className="label values">
                        {parseFloat(statistics.win_count).toFixed(2)} %
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            )}
          </div>
          <Rollers />
        </div>
      </Layout>
    </div>
  );
}

const playsTabs = [
  { id: 0, name: "manual", label: "Manual" },
  { id: 1, name: "script", label: "Script" },
];
