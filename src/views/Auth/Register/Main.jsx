import React, { useState } from "react";
import { Modal, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import uniqid from "uniqid";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { notify, api, token } from "../../../util";
import { getAccount } from "../../../lib/user";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLayout } from "../../../components/Layout/context/layoutContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function Main({ promoCode }) {
  const navigate = useNavigate();
  const [tosOpened, setTosOpened] = useState(false);
  const handleClose = () => {
    setTosOpened(false);
  };
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { setRegisterModalShow } = useLayout();

  const onRegisterClick = () => {
    const register = async () => {
      try {
        setLoading(true);
        const { tokens, user } = await api.post("/auth/register", {
          username,
          email,
          password:password1,
          promoCode,
        });
        token.setUser({ tokens, user });

        const r = await getAccount();
        if (r) {
          notify.success("Successfully registered!");
          setRegisterModalShow(false);
          navigate("/game");
        }
      } catch (err) {
        notify.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    register();
  };
  return (
    <>
      <div className="register">
        <Dialog
          open={tosOpened}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Terms of Service</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <div style={{ color: "black" }}>
                <p id="isPasted">
                  Terms of Service&nbsp;Version&nbsp;1, 2022-06-06
                </p>
                <p>
                  These terms of service define the relationship between 8BetHub
                  ("the operator") and the end user ("the user") regarding the
                  use of the website provided at&nbsp;8bethub.com&nbsp;("the
                  service").
                </p>
                <p>Forbidden Countries</p>
                <ol start="1" type="1">
                  <li>
                    Aruba, Curaçao, Sint Maarten, Cambodia, Bangladesh, Pakistan
                  </li>
                </ol>
                <p>Prohibited users</p>
                <ol start="1" type="1">
                  <li>
                    Users that are citizens or residents of any of the following
                    jurisdictions are prohibited from using the service:
                  </li>
                </ol>
                <div>
                  <ul>
                    <li>Applicable on a case-by-case basis</li>
                  </ul>
                </div>
                <ol start="2" type="1">
                  <li>
                    Users younger than 18 years of age are prohibited from using
                    the service.
                  </li>
                  <li>
                    Users for which using the service is not legal in their
                    applicable jurisdiction(s) are prohibited from using the
                    service.
                  </li>
                  <li>
                    Ensuring they are legally permitted to use the service is
                    the user's responsibility. The operator makes no claims and
                    provides no guarantees that using the service is legal for
                    the user.
                  </li>
                  <li>
                    To ensure that no prohibited users are using the service,
                    the operator may demand proof of age, citizenship, and
                    residence of any user at his own discretion. If the user
                    does not provide adequate proof at the operator's request,
                    they may be barred from further using the service.
                  </li>
                </ol>
                <p>Account access</p>
                <ol start="1" type="1">
                  <li>
                    An account's owner is authenticated solely by his login
                    credentials: the combination of his username, password, and
                    two-factor authentication method (if enabled). The operator
                    need not accept any other form of authentication. The user
                    acknowledges that he may permanently lose access to his
                    account and all funds contained within if he loses his login
                    credentials.
                  </li>
                  <li>
                    The user is responsible for securing his login credentials.
                    The operator shall not be liable for lost user accounts, or
                    the funds contained within or any other resulting damages if
                    the user knowingly or unknowingly provides a third party
                    with his login credentials, especially but not limited to
                    the user falling victim to social engineering or malware
                    attacks.
                  </li>
                  <li>
                    By voluntarily deleting his account, the user forfeits any
                    remaining balance and bankroll investments of the account.
                  </li>
                </ol>
                <p>Deposits &amp; withdrawals</p>
                <ol start="1" type="1">
                  <li>
                    A variety of coins is accepted for deposits and withdrawals.
                    Other cryptocurrencies that are not included in the list
                    displayed on this website sent to the service's deposit
                    addresses cannot be accessed by the operator and will not be
                    credited to the user's account or returned to the user.
                  </li>
                  <li>
                    In the case of blockchain forks, the operator may decide
                    which chain is considered to be used.
                  </li>
                  <li>
                    The operator attempts to process all withdrawals instantly
                    unless the user explicitly opts to queue his withdrawal. The
                    operator shall not be liable for delayed withdrawals
                    including those that are delayed through fault of the
                    operator.
                  </li>
                  <li>
                    The operator may temporarily halt all deposits to and
                    withdrawals from the service if he deems it necessary to
                    ensure the safety of users' funds (e.g., in the event of
                    blockchain forks) or for any other important reason.
                  </li>
                </ol>
                <p>Betting</p>
                <ol start="1" type="1">
                  <li>
                    All bets are final. The operator will not provide refunds of
                    lost bets, including but not limited to accidentally
                    submitted bets or bets lost due to network latency.
                  </li>
                  <li>
                    In the case of a dispute, the information received and
                    recorded by the service in its database shall be deciding.
                  </li>
                  <li>
                    Use of the script editor and the automated betting feature
                    is voluntary. The operator assumes no liability for
                    malfunctioning scripts.
                  </li>
                </ol>
                <p>Chat</p>
                <ol start="1" type="1">
                  <li>
                    The user agrees to abide by the chat rules. The operator may
                    temporarily or permanently prevent users that violate the
                    chat rules or are otherwise disruptive from participating in
                    the chat at the operator's sole discretion and without any
                    warning.
                  </li>
                  <li>
                    The operator is not liable for content that other users post
                    or link to in the chat.
                  </li>
                  <li>
                    The service is not a trading forum, and the operator
                    discourages all sorts of trading or other dealing among
                    players. The operator will not intervene in disputes among
                    players under any circumstances and shall not be liable for
                    any losses arising from such disputes.
                  </li>
                </ol>
                <p>Forfeiture of dormant accounts</p>
                <ol start="1" type="1">
                  <li>
                    The operator may permanently delete accounts that have not
                    been accessed for two years and may make usernames of
                    deleted accounts available for use with new accounts again.
                  </li>
                  <li>
                    For this purpose, an account's last access time is the time
                    that the user last signed into the account or connected to
                    the service while already signed in.
                  </li>
                  <li>
                    All funds of deleted dormant accounts including their
                    balance and any bankroll investments are forfeited by the
                    user and assumed by the operator.
                  </li>
                  <li>
                    No dormant accounts shall be deleted before October 1, 2021.
                  </li>
                </ol>
                <p>Miscellaneous</p>
                <ol start="1" type="1">
                  <li>
                    The agreement shall be governed by the laws of
                    Cura&ccedil;ao. Any legal disputes between the operator and
                    the user regarding the use of the service are to be decided
                    by the courts of Cura&ccedil;ao.
                  </li>
                  <li>
                    The operator may unilaterally modify these terms of service
                    at any time and without notice. Continued use of the service
                    implies consent to the new terms of service. For this
                    purpose, remaining invested in the bankroll is considered
                    use of the service.
                  </li>
                  <li>
                    The operator not insisting on one of his rights granted by
                    these terms of service in one or more specific instances
                    shall not pre-empt the operator from making use of this
                    right in the future.
                  </li>
                </ol>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Accept</Button>
          </DialogActions>
        </Dialog>
        <Modal.Body>
          <Header title="Create new account" />

          <div className="form-group">
            <div className="label">
              User name<span className="require-field">*</span>
            </div>
            <input
              placeholder="Enter username"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
            />
            {/*  <span className="label span-username">
            Valid user names are between 3 and 20 characters long and may
            consist of letters and numbers.
  </span> */}
          </div>
          <div className="form-group">
            <div className="label">
              Email address<span className="require-field">*</span>
            </div>
            <input
              placeholder="Enter valid email address"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="label">
              Password<span className="require-field">*</span>
            </div>

            <InputGroup>
              <FormControl
                className="register-inputs"
                type={showPassword1 ? 'text' : 'password'}
                placeholder="Enter password"
                value={password1}
                onInput={(e) => setPassword1(e.target.value)}
              />
              <Button
                className="visible-button"
                variant="outline-secondary"
                id="button-addon2"
                onClick={(e) => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Button>
            </InputGroup>
          </div>

          <div className="form-group">
            <div className="label">
              Confirm Password<span className="require-field">*</span>
            </div>
            <InputGroup>
              <FormControl
                className="register-inputs"
                type={showPassword2 ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={password2}
                onInput={(e) => setPassword2(e.target.value)}
              />
              <Button
                className="visible-button"
                variant="outline-secondary"
                id="button-addon2"
                onClick={(e) => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Button>
            </InputGroup>
          </div>
          {promoCode && (
            <div className="form-group">
              <div className="label">Promo Code</div>
              <input readonly disabled type="text" value={promoCode} />
            </div>
          )}

          <div className="form-group check-terms">
            <Form.Check
              checked="1"
              id="agree-terms-check"
              label={
                <>
                  I have read and agree to{" "}
                  <a
                    href="#"
                    onClick={() => {
                      setTosOpened(true);
                    }}
                    className="link"
                  >
                    the terms of service.
                  </a>
                </>
              }
            />
          </div>

          <button
            disabled={loading}
            onClick={onRegisterClick}
            className="primary-btn"
          >
            Create Account
          </button>

          <Footer />
        </Modal.Body>
      </div>
    </>
  );
}
