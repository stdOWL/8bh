import React from 'react'
import { Container } from 'react-bootstrap'
import { BoxTitle, SmallTitle } from '../../Title'
import './style.scss'


export default function Head() {
    return (
        <div className="trust-head">
            <Container>
                <BoxTitle title='8BetHub' />

                <div className='by'>
                    by <span>8hub</span>
                </div>

                <SmallTitle line='medium'>
                    <h2>Innovation that you can trust</h2>
                </SmallTitle>

                <p>
                8betHub was developed by professional engineers that have had experience in the cryptocurrency gambling industry and crash/dice game. Our service is of the best quality, reliable and convenient.
                
                </p>
            </Container>
        </div>
    )
}
