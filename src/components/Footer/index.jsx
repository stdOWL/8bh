import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import dicelogo from "../../assets/imgs/logo/icon.png";
import "./style.scss";
import FAQComponent from "./faqs";
import PagesComponent from "./pages";

export default function Footer() {
  const [FAQopen, setFAQopen] = React.useState(false);
  const [PageName, setPageName] = React.useState(null);

  return (
    <div className="footer">
      <FAQComponent open={FAQopen} setOpen={setFAQopen} />
      <PagesComponent PageName={PageName} setPageName={setPageName} />
      <Row className="justify-content-center">
        <Col md={11}>
          <Container>
            <Row>
              <Col lg={6} className="left">
                <Row>
                  <Col lg={10}>
                    <Image src={dicelogo} alrt="dice logo" />
                    <p>Next-Gen Dice game</p>
                    <div className="links">
                      <a href="https://bitcointalk.org/index.php?topic=5403811.0" target="_blank" rel="noreferrer">bitcointalk.org</a>
                      <a
                        target="_blank"
                        href="https://twitter.com/8bethub"
                        rel="noreferrer"
                      >
                        Twitter
                      </a>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={6} className="right">
                <Row>
                  <div className="col-6 col-md-5">
                    <h6>casino</h6>
                    <div className="links">
                      <a
                        target="_blank"
                        href="https://github.com/8bethub/scripts"
                        rel="noreferrer"
                      >
                        Scripts
                      </a>
                      <a
                        target="_blank"
                        href="https://8bethub.github.io/verifier/"
                        rel="noreferrer"
                      >
                        Verify fairness
                      </a>
                    </div>
                  </div>
                  <div className="col-6 col-md-7 help">
                    <h6>help</h6>
                    <div className="links">
                      <a onClick={() => setFAQopen(true)}>
                        Frequently asked questions
                      </a>
                      <a
                        onClick={() => {
                          window.Tawk_API && window.Tawk_API.popup();
                        }}
                      >
                        Support
                      </a>
                      <a href="mailto:8bethub@gmail.com">Contact us</a>
                      <a onClick={() => setPageName('TOS')}>Terms of Service</a>
                      <a onClick={() => setPageName('BTOS')}>Bonus Terms Conditions</a>
                      
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
