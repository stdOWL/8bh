import React from 'react'
import { Container } from 'react-bootstrap'
import { BoxTitle, SmallTitle } from '../../Title'
import './style.scss'


export default function Head() {
    return (
        <div className="trust-head">
            <Container>
                <BoxTitle title='8bethub' />

                <div className='by'>
                    by <span>8bethub</span>
                </div>

                <SmallTitle line='medium'>
                    <h2>A name you can trust</h2>
                </SmallTitle>

                <p>
                8bethub is brought to you by <span>bustabit</span>, one of the most trusted brands in Bitcoin gambling with more than
                    <br />₿1,000,000 wagered to date.
                </p>
            </Container>
        </div>
    )
}
