import { useState } from 'react'

const data = [
    -1.5, -0.2, -1, -0.6, -2.2, -1.7, -0.2, -1.1
]


const dummyData = [
    { name: 'Played', value: '3 days ago', color: '#fff' },
    { name: 'Wager', value: '1.00 bits', color: '#fff' },
    { name: 'Target', value: '2.34x', color: '#16ff63' },
    { name: 'Multiplier', value: '2.84x', color: '#fff' },
    { name: 'Bet Profit', value: '2.34x', color: '#16ff63' },
    { name: 'Net Peofit', value: '2.84x', color: '#fff' },
]


export default function useChart() {
    const [chartData, setChartData] = useState(data)
    const [tooltipData, setToolTipData] = useState(dummyData)


    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');

        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.className = 'custom-tooltip'


            const container = document.createElement('div');
            const header = document.createElement('div')
            header.className = 'tooltip-header'


            const title = document.createElement('b')
            title.textContent = 'Bet#8'
            title.className = 'bet-title'

            const mutedId = document.createElement('span')
            mutedId.className = 'mutedId'
            mutedId.textContent = '#gmJbaXA02p4zN63c92PNYq'

            header.appendChild(title)
            header.appendChild(mutedId)


            const stats = document.createElement('div')
            stats.className = 'tooltip-stats'

            dummyData.forEach(item => {
                let row = document.createElement('div')
                row.className = 'items-row'

                let name = document.createElement('span')
                let value = document.createElement('span')
                name.textContent = item.name
                value.textContent = item.value

                value.style.color = item.color
                name.style.fontWeight = '300'


                row.appendChild(name)
                row.appendChild(value)
                stats.appendChild(row)
            })

            container.appendChild(header)
            container.appendChild(stats)
            tooltipEl.appendChild(container);
            chart.canvas.parentNode.appendChild(tooltipEl);
        }

        return tooltipEl;
    };


    const sampleData = (canvas) => {
        let width, height, gradient;
        function getGradient(ctx, chartArea) {
            const chartWidth = chartArea.right - chartArea.left;
            const chartHeight = chartArea.bottom - chartArea.top;
            if (gradient === null || width !== chartWidth || height !== chartHeight) {
                // Create the gradient because this is either the first render
                // or the size of the chart has changed
                width = chartWidth;
                height = chartHeight;
                gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0.5, 'rgba(255, 104, 22, 0.150)');
                gradient.addColorStop(0.4, 'rgba(255, 104, 22, 0.100)');
                gradient.addColorStop(0.2, 'rgba(255, 104, 22, 0.040)');
            }

            return gradient;
        }

        return {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            datasets: [{
                data,
                tension: 0,
                pointStyle: 'circle',
                pointBorderWidth: 0,
                pointHoverBorderWidth: 13,
                pointHoverBorderColor: '#FF9900',
                borderWidth: 1.2,
                borderColor: '#fff',
                fill: 'start',
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return null;
                    }
                    return getGradient(ctx, chartArea);
                },
            }]
        }
    }

    return {
        chartData, setChartData,
        tooltipData, setToolTipData,
        getOrCreateTooltip,
        sampleData
    }
}




