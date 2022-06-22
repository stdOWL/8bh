import xrpIcon from '../../assets/imgs/xrp.svg'
import btcIcon from '../../assets/imgs/btc.png'
import ethIcon from '../../assets/imgs/eth.png'
import usdtIcon from '../../assets/imgs/usdt.png'
import bnbIcon from '../../assets/imgs/bnb.png'


export const depositCurrencies = [
    {
        name: 'XRP',
        icon: xrpIcon,
        balance: 100,
        networks: [
            {
                name: 'Ripple',
                wallet: 'b4x43cc13qx23d0xr233csdq25034sdy3vz34jwsdq'
            },
            {
                name: 'BEP20',
                wallet: 'b23cSDS1qd0xrq25023y23vzjwqw32326flySD2233'
            }
        ]
    },
    {
        name: 'BTC',
        icon: btcIcon,
        balance: 0.5,
        networks: [
            {
                name: 'BTC',
                wallet: 'dsbc341sdssqd0xrqd29250y893vzjwqw32wlr2689'
            },
            {
                name: 'BEP20',
                wallet: 'b23cSDS1qd0xrq25023y23vzjwqw32326flySD2233'
            }
        ],
    },
    {
        name: 'ETH',
        icon: ethIcon,
        balance: 1.5,
        networks: [
            {
                name: 'ERC20',
                wallet: 'b1237sd12trpiv123s434dsdsc145qd0xrq2534sd3'
            },
            {
                name: 'BEP20',
                wallet: 'b23cSDS1qd0xrq25023y23vzjwqw32326flySD2233'
            }
        ],
    },
    {
        name: 'USDT',
        icon: usdtIcon,
        balance: 60,
        networks: [
            {
                name: 'TRC20',
                wallet: '343b123c1dfdqd2343df4xrq250y334zjwqw4332df'
            },
            {
                name: 'BEP20',
                wallet: 'b23cSDS1qd0xrq25023y23vzjwqw32326flySD2233'
            }
        ],
    },
    {
        name: 'BNB',
        icon: bnbIcon,
        balance: 5,
        networks: [
            {
                name: 'BEP20',
                wallet: 's43dsbc334sd340xrs34q25sd04343433vzjwqw32'
            },
            {
                name: 'BEP2',
                wallet: 'b23cSDS1qd0xrq25023y23vzjwqw32326flySD2233'
            }
        ],
    },
]



