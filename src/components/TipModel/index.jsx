import React from "react";
import "./style.scss";
// import {Model} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
function Index(props) {
    const [showTipModel, setShowTipModel] = useState(false);
  return (
    <Modal
    show={showTipModel}
    onHide={() => setShowTipModel(false)}
    centered
    >
      <div className="tip-container">
        <div onClick={() => setShowTipModel(false)} className="close">X</div>
        <div className="orange-gradient-text heading">
          Are you sure you want to send kaiserpze a tip?
        </div>
        <div className="normal-text">
          Be aware that tipping someone will reveal the current server seed if
          it is used. <span className="why-text"> why?</span>
        </div>
        <div className="normal-text">
          For your security, we require all tips to be authorized via email
          before sending any funds.
        </div>
        <div className="normal-text">
          Balance available to{" "}
          <span className="why-text">tip: 349.14 bits</span>
        </div>
        <div className="input-group">
          <label className="off-white" htmlFor="amount">
            Amount
          </label>
          <input type="number" />
          <div className="off-white">
            You can not tip less than a single bit.
          </div>
        </div>
        <div className="hr"></div>
        <div className="d-flex justify-content-between my-3">
          <div>
            Deposite fee <span className="why-text">What’s this?</span>
          </div>
          <div>1.84 bits</div>
        </div>
        <div className="d-flex justify-content-between my-3">
          <div>Tipping Fee</div>
          <div>1.00 bits</div>
        </div>
        <div className="d-flex justify-content-between my-3">
          <div>Send Amount</div>
          <div>0.00 bits</div>
        </div>
        <div className="hr"></div>
        <div className="d-flex justify-content-between my-3">
          <div>Total</div>
          <div>2.84 bits</div>
        </div>
        <div className="hr"></div>
        <div className="input-group">
          <label className="off-white" htmlFor="amount">
            Password
          </label>
          <input type="password" />
          <div className="why-text">Forgot your password?</div>
        </div>
        <div className="tip-btn">
            <button>Tips</button>
        </div>
      </div>
    </Modal>
  );
}

export default Index;
