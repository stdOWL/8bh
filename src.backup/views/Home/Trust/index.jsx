import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Head from './Head'
import instantdeposit from '../../../assets/imgs/instant-deposit.png'
import ellipse from '../../../assets/imgs/ellipse.png'
import robot from '../../../assets/imgs/robot.png'
import skip from '../../../assets/imgs/skip.png'
import privacy from '../../../assets/imgs/privacy.png'
import bankroll from '../../../assets/imgs/bankroll.png'
import fairness from '../../../assets/imgs/fairness.png'
import coldstorage from '../../../assets/imgs/cold-storage.png'

import './style.scss'
import { BoxTitle, SmallTitle } from '../Title'

export default function index() {
    return (
        <div className="trust">
            <Head />
            <Container>
                <Row>
                    <Col lg={6}>
                        <div className='first-col'>
                            <Row>
                                {
                                    itemsCol1.map(item => (
                                        <Col lg={12} className='item'>
                                            <div className="icon">
                                                <img src={item.icon} />
                                                <img src={ellipse} className='ellipse' />
                                            </div>
                                            <SmallTitle line='small'>
                                                <h2>{item.title}</h2>
                                            </SmallTitle>
                                            {
                                                item.desc.map(p => <p>{p}</p>)
                                            }
                                            {
                                                item?.list && <ul>
                                                    {
                                                        item.list.map(listitem => <li>{listitem}</li>)
                                                    }
                                                </ul>
                                            }
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>

                    </Col>
                    <Col lg={6}>
                        <div className='sec-col'>
                            <Row>
                                {
                                    itemsCol2.map(item => (
                                        <Col lg={12} className='item'>
                                            <div className="icon">
                                                <img src={item.icon} />
                                                <img src={ellipse} className='ellipse' />
                                            </div>
                                            <SmallTitle line='small'>
                                                <h2>{item.title}</h2>
                                            </SmallTitle>
                                            {
                                                item.desc.map(p => <p>{p}</p>)
                                            }
                                            {
                                                item?.list && <ul>
                                                    {
                                                        item.list.map(listitem => <li>{listitem}</li>)
                                                    }
                                                </ul>
                                            }
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


const itemsCol1 = [
    {
        title: 'Instant deposits',
        icon: instantdeposit,
        desc: [
            "Don't like waiting? Have your eligible deposit credited immediately for a small fee."
        ]
    },
    {
        title: 'Skip a bet',
        icon: skip,
        desc: [
            "Having a streak of bad luck? Skip over as many multipliers as you like.",
            "Skipping a bet doesn't change its outcome and you still get to see the result."
        ]
    }, {
        title: 'Be the bankroll',
        icon: bankroll,
        desc: [
            "Looking to grow your Bitcoins slowly rather than for a thrill? Invest in the bankroll and participate in the casino's profits.",
        ],
        list: [
            "invest and divest whenever you want",
            "competitive commission on profits",
            "receive compensation when the bankroll is diluted",
            "proper risk management limited by the Kelly criterion"
        ]
    }, {
        title: 'Multisignature cold storage',
        icon: coldstorage,
        desc: [
            "The majority of users' funds is securely held in 2-of-3 cold storage with keys held by 8bethub, the auditor and a neutral third party.",
            "This wallet can only be accessed with the approval of at least two keyholders and ensures that users' deposits can be safely returned to them if something were to happen to one of the keyholders."
        ]
    }
]


const itemsCol2 = [
    {
        title: 'Native scripting support',
        icon: robot,
        desc: [
            "Automate your favorite strategies and share them with your friends.",
            "The full power of JavaScript is at your disposal in our sandboxed script editor."
        ]
    },
    {
        title: 'Enhanced privacy',
        icon: privacy,
        desc: [
            "We use a sophisticated coin selection algorithm tailored to 8bethub when handling payments in order to offer our players and investors industry-leading privacy. Not everyone needs to know you're gambling!",
            "Since it also significantly lowers our transaction costs, we are able to pass those savings onto you, making our withdrawal fees some of the lowest around!"
        ]
    },
    , {
        title: 'Provable fairness that protects everyone',
        icon: fairness,
        desc: [
            "8bethub builds upon the industry-standard provably fair scheme to provide additional guarantees to players, investors and the casino itself:",
        ],
        list: [
            "For players: In the event of a dispute with the casino it's no longer your word against theirs. 8bethub's auditor independently verifies all rolls and has your back.",
            "Assuming you trust the auditor to be independent of 8bethub, you can be sure all bets were made without knowledge of the outcome.",
            "The house gains confidence that all wins are legitimate. Stressful withdrawal delays due to security reviews become a thing of the past!"
        ]
    }
]