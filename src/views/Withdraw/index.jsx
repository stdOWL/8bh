import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Row, Col, Image, Form, Dropdown } from "react-bootstrap";
import xrpIcon from "../../assets/imgs/xrp.svg";
import btcIcon from "../../assets/imgs/btc.png";
import ethIcon from "../../assets/imgs/eth.png";
import usdtIcon from "../../assets/imgs/usdt.png";
import bnbIcon from "../../assets/imgs/bnb.png";
import "./style.scss";
import { useSelector } from "react-redux";
import { notify, api } from "../../util";

export default function Withdraw() {
  const { LOGGED_IN, name, depositCurrencies } = useSelector(({ user }) => ({
    LOGGED_IN: !!user,
    name: user ? user.username : null,
    depositCurrencies: user ? user.balances : [],
  }));
  const [depositCurrency, setDepositCurrency] = useState(null);
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (LOGGED_IN && depositCurrencies.length > 0 && !depositCurrency) {
      setDepositCurrency(depositCurrencies[0]);
    }
  }, [depositCurrency, LOGGED_IN, depositCurrencies]);
  const handleChange = ({ target: { name, value } }) => {
    setAmount(value);
  };

  const sendWithdrawRequest = async () => {
    try {
      const response = await api.post("/wallet/createWithdrawRequest", {
        amount,
        address,
        assetCode: depositCurrency.code,
      });
      if (response.result === "OK") {
        notify.success('Withdraw successfully created!');
      }
    } catch (err) {
      notify.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    LOGGED_IN &&
    depositCurrency && (
      <div className="withdraw">
        <Layout title="Withdraw">
          <div className="description">
            <p>
              <span>The minimum withdrawal is 0 {depositCurrency?.name}. </span>
              Precredited deposits are only available for withdrawal once
              confirmed.
            </p>
            <p className="light">
              Requesting a withdrawal will reveal the current server seed if it
              is used.
              <span> Why?</span>
            </p>
            <div className="balance-available-withdraw">
              <p>
                Balance available to withdraw:{" "}
                <span>
                  {" "}
                  {depositCurrency?.balance} {depositCurrency?.name}
                </span>
              </p>
            </div>
          </div>

          <Row className="withdraw-box">
            <Col lg={6} className="inputs">
              <div className="form-group">
                <div className="label">Currency</div>
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
                        className="item-icon"
                        onClick={() => setDepositCurrency(item)}
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
              </div>
              <div className="form-group">
                <div className="label">Address</div>
                <input
                  placeholder="Enter address"
                  value={address}
                  onChange={({ target: { name, value } }) => {
                    setAddress(value);
                  }}
                />
              </div>
              <div className="form-group amount">
                <div className="label">Amount</div>
                <div className="input-flex">
                  <div className="custom-input">
                    <input
                      value={amount}
                      onChange={({ target: { name, value } }) => {
                        setAmount(value);
                      }}
                      placeholder="Enter Amount"
                      type="number"
                    />
                    <div className="icons">
                      <Image
                        src={"/currencies/" + depositCurrency.code + ".png"}
                        alt={depositCurrency.name}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setAmount(depositCurrency?.balance)}
                    className="max"
                  >
                    Max
                  </button>
                </div>
              </div>
              {/*
              <div className="form-group instant-forgot">
                <div className="instant">
                  <Form.Check
                    id="instant-withdrawal-check"
                    label="Instant withdrawal"
                  />
                </div>
              </div>
              <p>
                <span>Note: </span> For your security, we require all
                withdrawals to be authorized via email before sending any funds.
              </p>
              */}
            </Col>

            <Col lg={6} className="withdraw">
              <div className="line">
                <span className="left">
                  Withdraw fee <span className="active"> What's this?</span>{" "}
                </span>
                <span className="right"> 0.0000 {depositCurrency?.name}</span>
              </div>

              <div className="line">
                <span className="left">Sent amount</span>
                <span className="right">
                  {" "}
                  {parseFloat(depositCurrency?.balance).toFixed(4)}{" "}
                  {depositCurrency?.name}
                </span>
              </div>
              <div className="dashed"></div>
              <div className="line total">
                <span className="left total-label">Total</span>
                <span className="right total-amount">
                  {" "}
                  {parseFloat(depositCurrency?.balance).toFixed(4)}{" "}
                  {depositCurrency?.name}
                </span>
              </div>
              <button onClick={sendWithdrawRequest} className="primary-btn">
                Withdraw
              </button>
            </Col>
          </Row>
        </Layout>
      </div>
    )
  );
}
