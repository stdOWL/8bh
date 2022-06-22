import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import useChart from './useChart'
import { useMediaQuery } from 'react-responsive'
import './style.scss'


export default function Chart() {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

    const { sampleData, getOrCreateTooltip } = useChart()

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })



    return (
        <div className='chart'>
            <Line
                data={sampleData()}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            max: 2,
                            min: -3,
                            ticks: {
                                callback: (value, index, ticks) => {
                                    return value + ' Bits'
                                },
                                precision: 0,
                                color: ({ tick }) => {
                                    return (
                                        tick.value === 0
                                            ? 'rgba(255, 104, 22, 0.7)'
                                            : 'rgba(255, 255, 255, 0.7)'
                                    )
                                },
                                backdropPadding: 5,
                                font: {
                                    size: isMobile ? 11 : isTablet ? 14 : 16
                                }

                            },
                            grid: {
                                color: ({ tick }) => {
                                    return (
                                        tick.value === 0
                                            ? 'rgba(255, 255, 255, 0.2)'
                                            : 'rgba(255, 255, 255, 0.08)'
                                    )
                                },
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                borderDash: [10, 5],
                                lineWidth: 1.5
                            }
                        },
                        x: {
                            grid: {
                                borderColor: 'rgba(255, 255, 255, 0.2)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                    size: isMobile ? 11 : isTablet ? 14 : 16
                                }
                            }
                        },
                    },
                    plugins: {
                        tooltip: {
                            // Disable the on-canvas tooltip
                            enabled: false,

                            external: function (context) {
                                // Tooltip Element
                                const { chart, tooltip } = context;
                                const tooltipEl = getOrCreateTooltip(chart);

                                // Hide if no tooltip
                                if (tooltip.opacity === 0) {
                                    tooltipEl.style.opacity = 0;
                                    return;
                                }


                                const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

                                tooltipEl.style.opacity = 1;
                                tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                                tooltipEl.style.top = positionY + tooltip.caretY + 'px';
                                tooltipEl.style.font = tooltip.options.bodyFont.string;
                            }
                        }
                    },
                    onHover: function (evt, element) {
                        if (element.length > 0) {
                            //call setToolTipData with chartData[] & element[0].index 
                            //to change tooltip data
                            console.log(element[0].index)
                        }
                    }

                }}
            />


        </div>
    )
}
