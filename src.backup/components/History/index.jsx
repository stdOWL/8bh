import React from 'react'
import { Table, Image } from 'react-bootstrap'
import { history } from './data'
import './style.scss'



export default function History() {

    const redirectToBscScan = (address) => {
        window.open(`https://bscscan.com/tx/${address}`)
    }

    return (
        <div className="history">

            <h4>History</h4>
            <div className="history-box">
                <Table responsive borderless>
                    <thead>
                        <tr>
                            <th>First seen</th>
                            <th>Value</th>
                            <th>Status</th>
                            <th>Address</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map((his, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="firstseen">
                                            <span>{his.firstseen.name}</span>
                                            <span className='date'>{his.firstseen.date}</span>
                                        </div>
                                    </td>
                                    <td className='value'>
                                        {his.value.amount.toLocaleString()}
                                        <Image
                                            src={his.value.icon}
                                            alt={his.value.coin}
                                        />
                                    </td>
                                    <td className={`text-${his.status}`} >{his.status}</td>
                                    <td className='address'>{his.address}</td>
                                    <td className='transaction' onClick={() => redirectToBscScan(his.transaction)}>
                                        {
                                            his.transaction.substring(0, 5)
                                            +
                                            '..'
                                            +
                                            his.transaction.substring(his.transaction.length - 2, his.transaction.length)
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
