import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Head from "./Head";
import instantdeposit from "../../../assets/imgs/instant-deposit.png";
import ellipse from "../../../assets/imgs/ellipse.png";
import robot from "../../../assets/imgs/robot.png";
import skip from "../../../assets/imgs/skip.png";
import privacy from "../../../assets/imgs/privacy.png";
import bankroll from "../../../assets/imgs/bankroll.png";
import fairness from "../../../assets/imgs/fairness.png";
import coldstorage from "../../../assets/imgs/cold-storage.png";

import "./style.scss";
import { BoxTitle, SmallTitle } from "../Title";

export default function index() {
  return (
    <div className="trust">
      <Head />
      <Container>
        <Row>
          <Col lg={6}>
            <div className="first-col">
              <Row key="itemcol1">
                {itemsCol1.map((item, index) => (
                  <Col key={`col1_${index}`} lg={12} className="item">
                    <div className="icon">
                      <img src={item.icon} />
                      <img src={ellipse} className="ellipse" />
                    </div>
                    <SmallTitle line="small">
                      <h2>{item.title}</h2>
                    </SmallTitle>
                    {item.desc.map((p,index) => (
                      <p key={`items1_${index}`}>{p}</p>
                    ))}
                    {item?.list && (
                      <ul>
                        {item.list.map((listitem, index) => (
                          <li key={`descs1_${index}`}>{listitem}</li>
                        ))}
                      </ul>
                    )}
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col lg={6}>
            <div className="sec-col">
              <Row key="itemcol2">
                {itemsCol2.map((item, index) => (
                  <Col key={`col2_${index}`} lg={12} className="item">
                    <div className="icon">
                      <img src={item.icon} />
                      <img src={ellipse} className="ellipse" />
                    </div>
                    <SmallTitle line="small">
                      <h2>{item.title}</h2>
                    </SmallTitle>
                    {item.desc.map((p,index) => (
                      <p key={`descs2_${index}`}>{p}</p>
                    ))}
                    {item?.list && (
                      <ul>
                        {item.list.map((listitem, index) => (
                          <li key={`items2_${index}`}>{listitem}</li>
                        ))}
                      </ul>
                    )}
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const itemsCol1 = [
  {
    title: "Instant deposits",
    icon: instantdeposit,
    desc: [
      "Don't like waiting? Have your eligible deposit credited immediately for a small fee.",
    ],
  },
  {
    title: "Skip a bet",
    icon: skip,
    desc: [
      "Bad luck happens to us all, we allow you to skip as many bets as you feel like until your luck restores. This does not influence the outcome.",
    ],
  },
  {
    title: "Become the Bankroll",
    icon: bankroll,
    desc: ["Available soon!"],
    list: [],
  },
  {
    title: "Improved multi-signature cold wallet",
    icon: coldstorage,
    desc: [
      "Our wallets can only be accessed with the approval of at least two keyholders and ensures that users' deposits can be safely returned to them if something were to happen to one of the keyholders.",
    ],
  },
];

const itemsCol2 = [
  {
    title: "Advanced and basic scripting support",
    icon: robot,
    desc: [
      "Use the best strategies available to you easily and efficiently. Our editor makes it easy for you to put in your method.",
    ],
  },
  {
    title: "Enhanced privacy",
    icon: privacy,
    desc: [
      "We use a sophisticated coin selection algorithm tailored to 8bethub when handling payments in order to offer our players and investors industry-leading privacy. Not everyone needs to know you're gambling!",
      "Since it also significantly lowers our transaction costs, we are able to pass those savings onto you, making our withdrawal fees some of the lowest around!",
    ],
  },
  ,
  {
    title: "Advanced provable fairness system",
    icon: fairness,
    desc: [
      "8betHub improved the industry-standard provably fair system to provide additional guarantees to players, investors, and the house itself:",
    ],
    list: [
      "For players: In the event of a dispute with the casino it's no longer your word against theirs. 8bethub's auditor independently verifies all rolls and has your back.",
      "Assuming you trust the auditor to be independent of 8bethub, you can be sure all bets were made without knowledge of the outcome.",
      "The house gains confidence that all wins are legitimate. Stressful withdrawal delays due to security reviews become a thing of the past!",
    ],
  },
];
