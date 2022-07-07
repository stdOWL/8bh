import React, { useEffect, useState } from "react";
import { Row, Col, Image, Dropdown } from "react-bootstrap";
import qrcode from "../../assets/imgs/qrcode.png";
import copy from "copy-to-clipboard";
import Layout from "../../components/Layout";
import "./style.scss";
import { useSelector } from "react-redux";
import { QRCode } from "react-qrcode-logo";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

export default function Deposit() {
  let navigate = useNavigate();
  

  const { LOGGED_IN, name, depositCurrencies } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    name: user ? user.username : null,
    depositCurrencies: user ? user.balances : [],
  }));
  const [depositCurrency, setDepositCurrency] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  
  
  useEffect(() => {
    if(!LOGGED_IN){
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (LOGGED_IN && depositCurrencies.length > 0 && depositCurrency == null) {
      setDepositCurrency(depositCurrencies[0]);
      setSelectedNetwork(depositCurrencies[0].networks[0]);
      setCopied(false);
    }
  }, [depositCurrency, LOGGED_IN, depositCurrencies]);

  const [copied, setCopied] = useState(false);
  const changeCurrency = (currency) => {
    setDepositCurrency(currency);
    if (currency.networks.length > 0) setSelectedNetwork(currency.networks[0]);
    else setSelectedNetwork(null);
  };
  const copyWallet = () => {
    if (selectedNetwork) copy(selectedNetwork.wallet);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    depositCurrency && (
      <div className="deposit">
        <Layout title="Deposit">
          <Row className="deposit-box">
            <Col lg={4} className="qrcode">
              <QRCode
                value={selectedNetwork?.wallet || ""}
                size={275}
                eyeRadius={1}
              />
            </Col>
            <Col lg={8} className="deposit-info">
              <Row>
                <Col md={6}>
                  <div className="label">Deposit Currency</div>
                  <Dropdown>
                    <Dropdown.Toggle>
                      <div className="item-icon">
                        <Image
                          src={"/currencies/" + depositCurrency.code + ".png"}
                          alt={depositCurrency.name}
                        />
                        {depositCurrency.name}
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {depositCurrencies.map((item, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => changeCurrency(item)}
                          className="item-icon"
                        >
                          <Image
                            src={"/currencies/" + item.code + ".png"}
                            alt={item.name}
                          />
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                {/* <Col md={6} className="balance">
                  <div className="label">Balance</div>
                  <div className="balance-input">
                    <input
                      value={depositCurrency.balance}
                      onChange={({ target }) => console.log(target.value)}
                    />
                  </div>
                      </Col> */}
              </Row>
              {selectedNetwork && (
                <>
                  <div className="network">
                    <div className="label">Choose Network</div>
                    <div className="network-items">
                      {depositCurrency.networks.map((item, index) => (
                        <div
                          key={index}
                          className={`network-item ${
                            selectedNetwork === item ? "active" : null
                          }`}
                          onClick={() => setSelectedNetwork(item)}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                    <div style={{ paddingTop: '2rem' }}>
                      
                      <Alert severity="info">
                        Deposit will be processed after first confirmation.<br/>Minimum Deposit: {parseFloat(depositCurrency.min_deposit)} {depositCurrency.code.toUpperCase()}
                      </Alert>
                    </div>
                  </div>
                  <div className="address">
                    <div>
                      <p>
                        Send any amount of {depositCurrency.name} to this
                        address to fund your account:
                      </p>
                      <span className="wallet">
                        <strong>{selectedNetwork.wallet}</strong>
                      </span>
                    </div>
                    <button onClick={copyWallet}>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 19 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.15169 4.08483V15.8457C2.15151 17.0093 2.59395 18.1295 3.38927 18.9789C4.18458 19.8284 5.27322 20.3435 6.43436 20.4198L6.73503 20.429H14.8274C14.6378 20.9651 14.2868 21.4293 13.8225 21.7576C13.3583 22.0859 12.8036 22.2622 12.235 22.2623H5.81836C4.35967 22.2623 2.96072 21.6829 1.92927 20.6514C0.897822 19.62 0.31836 18.221 0.31836 16.7623V6.679C0.318061 6.11006 0.494227 5.55505 0.822578 5.09043C1.15093 4.62581 1.6153 4.27447 2.15169 4.08483ZM15.9017 0.262329C16.631 0.262329 17.3305 0.55206 17.8462 1.06779C18.362 1.58351 18.6517 2.28298 18.6517 3.01233V15.8457C18.6517 16.575 18.362 17.2745 17.8462 17.7902C17.3305 18.3059 16.631 18.5957 15.9017 18.5957H6.73503C6.00568 18.5957 5.30621 18.3059 4.79048 17.7902C4.27476 17.2745 3.98503 16.575 3.98503 15.8457V3.01233C3.98503 2.28298 4.27476 1.58351 4.79048 1.06779C5.30621 0.55206 6.00568 0.262329 6.73503 0.262329H15.9017Z"
                          fill="white"
                        />
                      </svg>
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Layout>
      </div>
    )
  );
}
