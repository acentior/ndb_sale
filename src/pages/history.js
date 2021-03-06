import React, { useReducer, useCallback } from "react"
import Header from "../components/common/header"
import Select, { components } from "react-select"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { numberSign, numberWithCommas } from "../utilities/number"
import {
    BTC,
    BCH,
    DAI,
    DOGE,
    ETH,
    LTC,
    USDC,
    NDB,
    Airdrop,
    Address,
    Copy2,
    CloseIcon,
} from "../utilities/imgImport"
import { Link } from "gatsby"
import Modal from "react-modal"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Input } from "../components/common/FormControl"
import { useWindowSize } from "../utilities/customHook"
import AirdropDetail from "../components/AirdropDetail"
// import ReactECharts from "echarts-for-react"

const transactions = [
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: -3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
]
const market_data = [
    {
        icon: ETH,
        abbr: "ETH",
        name: "Ethereum",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: BTC,
        abbr: "BTC",
        name: "Bitcoin",
        price: 282004.43,
        percent: -2.2,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: BCH,
        abbr: "BCH",
        name: "Bitcoin Cash",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: DAI,
        abbr: "DAI",
        name: "Dai",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$1,7B",
    },
    {
        icon: DOGE,
        abbr: "DOGE",
        name: "Dogecoin",
        price: 282004.43,
        percent: -1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: USDC,
        abbr: "USDC",
        name: "USD Coin",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: LTC,
        abbr: "LTC",
        name: "Litecoin",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: USDC,
        abbr: "USDC",
        name: "USD Coin",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: LTC,
        abbr: "LTC",
        name: "Litecoin",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
]
const my_assets = [
    {
        icon: NDB,
        abbr: "NDB",
        name: "NDB Token",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: ETH,
        abbr: "ETH",
        name: "Ethereum",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: BTC,
        abbr: "BTC",
        name: "Bitcoin",
        amount: 12.0865,
        price: 282004.43,
    },
]
const airdrops = [
    {
        icon: Airdrop,
        name: "ICON (ICX)",
        desc: "General-purpose blockchain protocol",
        status: "Active",
        end: "14 Apr 2022",
        reward: 150,
        participants: 60,
        winners: 20,
    },
    {
        icon: Airdrop,
        name: "BtcEX (BXC)",
        desc: "Crypto exchange platform",
        status: "Active",
        end: "14 Apr 2022",
        reward: 300,
        participants: 60,
        winners: 20,
    },
    {
        icon: Airdrop,
        name: "Publish0x",
        desc: "Crypto-publishing platform",
        status: "Ended",
        end: "Unkown",
        reward: 100,
        participants: 60,
        winners: 20,
    },
]
const bids = [
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 55",
        date: "2021.04.30",
        bid: 360000,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 55",
        date: "2021.04.30",
        bid: 360000,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
]
const coins = [
    { value: "eth", label: "Ethereum", icon: ETH },
    { value: "btc", label: "Bitcoin", icon: BTC },
    { value: "doge", label: "Dogecoin", icon: DOGE },
]
const joins = [
    {
        label: "Connect your MetaMask wallet",
        btnName: "Connect metamask wallet",
    },
    {
        label: "Connect your BitMEX API key",
        btnName: "Connect ",
    },
    {
        label: "Follow Facebook account",
        btnName: "Follow",
    },
    {
        label: "Join Telegram channel",
        btnName: "Join",
    },
]

// Select option customization
const { Option, SingleValue } = components
const IconOption = (props) => (
    <Option {...props}>
        <img
            src={props.data.icon}
            style={{ width: 24, marginRight: "4px" }}
            alt={props.data.label}
        />
        {props.data.label}
    </Option>
)
const SelectedValue = (props) => {
    return (
        <SingleValue {...props}>
            <img src={props.data.icon} style={{ width: 24 }} alt={props.data.label} />
            <p>{props.data.label}</p>
        </SingleValue>
    )
}

const History = () => {
    const copyText = "kjY602GgjsKP23mhs09oOp63bd3n34fsla"
    const size = useWindowSize()
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        amount: "",
        detail_show: false,
        index: 0,
        coin: coins[0],
        copied: false,
        modalIsOpen: false,
        airdropModal: false,
        joinAirdrop: false,
        facebook_handle: "",
        telegram_handle: "",
    })
    const {
        amount,
        detail_show,
        index,
        coin,
        copied,
        modalIsOpen,
        airdropModal,
        joinAirdrop,
        facebook_handle,
        telegram_handle,
    } = state

    const handleClick = (idx) => {
        setState({ detail_show: true })
        setState({ index: idx })
    }
    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])
    const handleJoinAirdrop = () => {
        setState({ joinAirdrop: true })
    }

    return (
        <main className="history-page">
            <Header />
            <section className="container">
                <div className="section-history row">
                    <div className="section-history__left col-lg-4 col-md-5">
                        <Tabs>
                            <TabList>
                                <Tab>Bid activity</Tab>
                                <Tab className="react-tabs__tab ms-auto">WALLET</Tab>
                            </TabList>
                            <TabPanel>
                                <ul className="bid-activity">
                                    {bids.map((item, idx) => (
                                        <li
                                            className="d-flex align-items-center justify-content-between"
                                            key={idx}
                                        >
                                            <div>
                                                <p className="bid-name">{item.name}</p>
                                                <p className="bid-date">{item.date}</p>
                                            </div>
                                            <p className="bid-price">
                                                {numberWithCommas(item.bid)}
                                                <span className="txt-green"> T</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </TabPanel>
                            <TabPanel>
                                <div className="d-flex justify-content-end">
                                    <Link to="/" className="verify-link">
                                        Get verified
                                    </Link>
                                </div>
                                <div className="profile-value">
                                    <h5>Portfolio value </h5>
                                    <div className="value-box">
                                        <p className="value-label">Equity Value (BTC)</p>
                                        <p className="value">6.00</p>
                                        <p className="max-value">~ $282,004.43</p>
                                    </div>
                                </div>
                                <h5 className="my-4">Transactions history</h5>
                                <div className="transaction-history">
                                    {transactions.map((item, idx) => (
                                        <div className="transaction" key={idx}>
                                            <p className="transaction-date">{item.date}</p>
                                            <div className="d-flex justify-content-between">
                                                <p className="transaction-name">{item.name}</p>
                                                <p className="transaction-price">
                                                    {numberSign(item.price) + item.price}$
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="section-history__right col-lg-8 col-md-7">
                        <Tabs onSelect={() => setState({ detail_show: false })}>
                            <div className="tab-top">
                                <TabList>
                                    <Tab>MY ASSETS</Tab>
                                    <Tab>market</Tab>
                                    <Tab className="react-tabs__tab ms-md-auto">AirdropS</Tab>
                                </TabList>
                                <Link to="/" className="verify-link">
                                    Get verified
                                </Link>
                            </div>
                            <TabPanel>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Crypto Assets</th>
                                            <th className="text-end">Amount</th>
                                            <th className="text-end">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {my_assets.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="d-flex align-items-start ps-2">
                                                    <img
                                                        src={item.icon}
                                                        alt="coin icon"
                                                        className="me-2"
                                                    />
                                                    <div>
                                                        <p className="coin-abbr">{item.abbr}</p>
                                                        <p className="coin-name">{item.name}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="coin-price">{item.amount}</p>
                                                    <p className="coin-percent">
                                                        ${numberWithCommas(item.price)}
                                                    </p>
                                                </td>
                                                <td className="coin-operations">
                                                    <p
                                                        onClick={() =>
                                                            setState({ modalIsOpen: true })
                                                        }
                                                        onKeyDown={() =>
                                                            setState({ modalIsOpen: true })
                                                        }
                                                        role="presentation"
                                                        className="operation-link"
                                                    >
                                                        Deposit
                                                    </p>
                                                    <p
                                                        onClick={() =>
                                                            setState({ modalIsOpen: true })
                                                        }
                                                        onKeyDown={() =>
                                                            setState({ modalIsOpen: true })
                                                        }
                                                        role="presentation"
                                                        className="operation-link ms-5"
                                                    >
                                                        Withdraw
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th className="text-end">Price</th>
                                            <th className="laptop-not text-center">Price Chart</th>
                                            <th className="mobile-not text-end">Volume (24h)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {market_data.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="d-flex align-items-start ps-2">
                                                    <img
                                                        src={item.icon}
                                                        alt="coin icon"
                                                        className="me-2"
                                                    />
                                                    <div>
                                                        <p className="coin-abbr">{item.abbr}</p>
                                                        <p className="coin-name">{item.name}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="coin-price">
                                                        ${numberWithCommas(item.price)}
                                                    </p>
                                                    <p
                                                        className={
                                                            numberSign(item.percent) === "+"
                                                                ? "coin-percent txt-green"
                                                                : "coin-percent txt-red"
                                                        }
                                                    >
                                                        {numberSign(item.percent) + item.percent}%
                                                    </p>
                                                </td>
                                                <td className="laptop-not price-chart"> </td>
                                                <td className="mobile-not text-end">
                                                    {item.volume}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <table
                                    className={`${
                                        detail_show &&
                                        (size.width > 1024 || size.width <= 576) &&
                                        "d-none"
                                    }`}
                                >
                                    <thead>
                                        <tr>
                                            <th className="w-50">Airdrop</th>
                                            <th>Status</th>
                                            <th className="laptop-not">End</th>
                                            <th>Reward</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airdrops.map((item, idx) => (
                                            <tr
                                                key={idx}
                                                className="airdrop-link"
                                                onClick={() => {
                                                    handleClick(idx)
                                                    setState({ airdropModal: true })
                                                }}
                                            >
                                                <td className="w-50">
                                                    <div className="d-flex align-items-start ps-2">
                                                        <img
                                                            src={item.icon}
                                                            alt="coin icon"
                                                            className="me-2"
                                                        />
                                                        <div>
                                                            <p className="coin-abbr">{item.name}</p>
                                                            <p className="coin-name mobile-not">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    className={
                                                        item.status === "Active"
                                                            ? "coin-status active"
                                                            : "coin-status deactive"
                                                    }
                                                >
                                                    {item.status}
                                                </td>
                                                <td className="laptop-not">{item.end}</td>
                                                <td className="coin-reward">={item.reward} USD</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <AirdropDetail
                                    clsName={
                                        (size.width > 1024 || size.width <= 576) && detail_show
                                            ? "d-block"
                                            : "d-none"
                                    }
                                    airdrop={airdrops[index]}
                                    onJoinClick={handleJoinAirdrop}
                                />
                            </TabPanel>
                        </Tabs>
                        <div className="connect-external">
                            <button className="btn-primary">CONNECT TO EXTERNAL WALLET</button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setState({ modalIsOpen: false })}
                ariaHideApp={false}
                className="deposit-modal"
                overlayClassName="deposit-modal__overlay"
            >
                <div className="pwd-modal__header">
                    Desposits and withdrawals
                    <div
                        onClick={() => setState({ modalIsOpen: false })}
                        onKeyDown={() => setState({ modalIsOpen: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                <Select
                    className="cryptocoin-select"
                    options={coins}
                    value={coin}
                    onChange={(v) => setState({ coin: v })}
                    components={{
                        Option: IconOption,
                        SingleValue: SelectedValue,
                    }}
                />
                <Tabs className="deposit-tab">
                    <TabList>
                        <Tab>Deposit</Tab>
                        <Tab>Withdraw</Tab>
                    </TabList>
                    <TabPanel className="deposit-panel">
                        <CopyToClipboard
                            onCopy={() => setState({ copied: true })}
                            text={copyText}
                            options={{ message: "copied" }}
                        >
                            <div
                                className="clipboard"
                                onClick={() => setState({ copied: true })}
                                onKeyDown={() => setState({ copied: true })}
                                role="presentation"
                            >
                                <div>
                                    <p>Deposit Address</p>
                                    <code>{copyText}</code>
                                </div>
                                <img src={Copy2} alt="copy" />
                            </div>
                        </CopyToClipboard>
                        {copied ? <span style={{ color: "white" }}>Copied.</span> : null}
                        <div className="bitcoin-address">
                            <img src={Address} alt="bitcoin address" />
                            <p>Send only Bitcoin to this deposit adress</p>
                        </div>
                        <button className="btn-second w-100">Share Address</button>
                    </TabPanel>
                    <TabPanel className="withdraw-panel">
                        <Input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={handleInput}
                            placeholder="Deposit amount"
                        />
                        <div className="my-3">
                            <div className="available-balance">
                                <p>Available balance</p>
                                <p>5.0054 BTC</p>
                            </div>
                            <div className="minimum-transfer">
                                <p>Minimum transfer</p>
                                <p>0.00200 BTC</p>
                            </div>
                        </div>
                        <Select
                            className="cryptocoin-select"
                            options={coins}
                            value={coin}
                            onChange={(v) => setState({ coin: v })}
                            components={{
                                Option: IconOption,
                                SingleValue: SelectedValue,
                            }}
                        />
                        <button className="btn-second w-100">Withdraw</button>
                    </TabPanel>
                </Tabs>
            </Modal>
            <Modal
                isOpen={airdropModal}
                onRequestClose={() => setState({ airdropModal: false })}
                ariaHideApp={false}
                className="airdrop-modal"
                overlayClassName="airdrop-modal__overlay"
            >
                <div className="tfa-modal__header">
                    <div
                        onClick={() => setState({ airdropModal: false })}
                        onKeyDown={() => setState({ airdropModal: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                <AirdropDetail
                    clsName={size.width <= 1024 && airdropModal ? "d-block" : "d-none"}
                    airdrop={airdrops[index]}
                    onJoinClick={handleJoinAirdrop}
                />
            </Modal>
            <Modal
                isOpen={joinAirdrop}
                onRequestClose={() => setState({ joinAirdrop: false })}
                ariaHideApp={false}
                className="join-modal"
                overlayClassName="join-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <div className="d-flex align-items-center">
                        <img
                            src={airdrops[index].icon}
                            alt="coin icon"
                            className="detail-header__icon me-2"
                        />
                        <p className="detail-header__name">{airdrops[index].name}</p>
                    </div>

                    <div
                        onClick={() => setState({ joinAirdrop: false })}
                        onKeyDown={() => setState({ joinAirdrop: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                <div className="join-airdrop">
                    <ul className="join-list">
                        {joins.map((item, idx) => (
                            <li key={idx}>
                                <p>{item.label}</p>
                                <button className="btn-green">{item.btnName}</button>
                            </li>
                        ))}
                    </ul>
                    <div className="my-3">
                        <Input
                            type="text"
                            name="facebook_handle"
                            label="Facebook handle "
                            value={facebook_handle}
                            onChange={handleInput}
                            placeholder="Enter Facebook handle"
                        />
                        <Input
                            type="text"
                            name="telegram_handle"
                            label="Facebook handle "
                            value={telegram_handle}
                            onChange={handleInput}
                            placeholder="Enter Telegram"
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn-primary">Join Airdrop</button>
                    </div>
                </div>
            </Modal>
        </main>
    )
}

export default History
