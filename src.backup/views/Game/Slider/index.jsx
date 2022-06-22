import React, { useState } from 'react'
import ReactSlider from 'react-slider'
import shape from '../../../assets/imgs/shape.png'
import './style.scss'

export default function Slider() {
    const [range, setRange] = useState(5)


    return (

        <div className="slider">

            <ReactSlider
                className="inner-slider"
                thumbClassName="thumb"
                trackClassName="track"
                min={1}
                max={100}
                value={range}
                onChange={(value) => setRange(value)}
                renderThumb={(props, state) => (
                    <div {...props}>
                        <span>{state.valueNow}</span>
                        <img src={shape} />
                    </div>
                )}
            />



        </div>
    )
}
