/* eslint-disable */

import React, { useState, useEffect, useMemo } from "react"
import Slider from "rc-slider"
import Modal from "react-modal"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Tabs, Tab, TabList, TabPanel } from "react-tabs"
import Header from "../../components/common/header"
import { getSecTomorrow, numberWithLength } from "../../utilities/number"

const modalDesc = {
    sign: [
        "To buy please sign in or sign up for an account.",
        "To buy for more than 2000 CHF worth, please sign in or create an account and complete the KYC identity verification.",
        "To buy more than 100,000 CHF worth, please sign in or create an account and complete the AML identity verification.",
    ],
    verify: [
        "To buy more than 2000 CHF worth, please complete the KYC identity verification.",
        "To buy more than 100,000 CHF worth, please complete the AML identity verification.",
    ],
}

const Auction = () => {
    const auth = {
        isSigned: true,
        isKYCVerified: false,
        isAMLVerified: false,
    }
    const duration = 86400
    const [curTime, setCurTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0)
    const distanceToDate = getSecTomorrow()
    const percentage = (distanceToDate / duration) * 100
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [tabIndex, setTabIndex] = useState(2)
    const [walletAddress, setWalletAddress] = useState("")

    const paymentDisabled = useMemo(() => {
        if (tabIndex === 0) {
            return false
        } else if (tabIndex === 1 && walletAddress) {
            return false
        }
        return true
    }, [tabIndex, walletAddress])

    useEffect(() => {
        const id = setInterval(() => {
            setCurTime({
                hours: parseInt(getSecTomorrow() / (60 * 60)),
                minutes: parseInt((getSecTomorrow() % (60 * 60)) / 60),
                seconds: parseInt(getSecTomorrow() % 60),
            })
        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [])

    const handleBuyToken = () => {
        if (!auth.isSigned) {
            setModalIsOpen(true)
            return
        } else if (amount >= 100000) {
            if (!auth.isAMLVerified) {
                setModalIsOpen(true)
                return
            }
        } else if (amount >= 2000) {
            if (!auth.isKYCVerified) {
                setModalIsOpen(true)
                return
            }
        }
        setShowSelect(true)
    }

    const renderModalContent = () => {
        if (!auth.isSigned) {
            return (
                <>
                    <p className="description">
                        {amount >= 100000
                            ? modalDesc.sign[2]
                            : amount >= 2000
                            ? modalDesc.sign[1]
                            : modalDesc.sign[0]}
                    </p>
                    <div className="btnDiv">
                        <Link to="/signup">
                            <p className="blackbtn">Sign Up</p>
                        </Link>
                        <Link to="/signin">
                            <p className="greenbtn">Sign In</p>
                        </Link>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <p className="description">
                        {amount >= 100000
                            ? modalDesc.verify[1]
                            : amount >= 2000
                            ? modalDesc.verify[0]
                            : ""}
                    </p>
                    <div className="btnDiv">
                        <Link to="#">
                            <p
                                onClick={() => setModalIsOpen(false)}
                                onKeyDown={() => setModalIsOpen(false)}
                                role="presentation"
                                className="blackbtn"
                            >
                                Go back
                            </p>
                        </Link>
                        <Link
                            to={`${
                                amount >= 100000
                                    ? "/aml_verify"
                                    : amount >= 2000
                                    ? "/kyc_verify"
                                    : ""
                            }`}
                        >
                            <p className="greenbtn">Verify</p>
                        </Link>
                    </div>
                </>
            )
        }
    }

    const closeSelectWallet = () => {
        setShowSelect(false)
        setTabIndex(2)
        setWalletAddress("")
    }

    return (
        <main className="purchaseAuction-page">
            <Header />
            <section className="container">
                <div className="row">
                    <div className="auction-left col-md-5">
                        <p className="title">Next round starts In</p>
                        <div className="timebar">
                            <div className="progress">
                                <span className="time" style={{ left: percentage * 0.8 + "%" }}>
                                    {numberWithLength(curTime.hours, 2)} :{" "}
                                    {numberWithLength(curTime.minutes, 2)} :{" "}
                                    {numberWithLength(curTime.seconds, 2)}
                                </span>
                                <span
                                    className="pointer"
                                    style={{ left: percentage * 0.8 + 9 + "%" }}
                                ></span>
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: percentage + "%",
                                        background:
                                            "linear-gradient(270deg, #941605 60%, #de4934 86.3%)",
                                        transform: "rotate(-180deg)",
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td className="item">Token Left</td>
                                        <td className="quantity">100</td>
                                    </tr>
                                    <tr>
                                        <td className="item">Token Sold For</td>
                                        <td className="quantity">100</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="auction-right col-md-7">
                        <p className="title">Exclusive pre round</p>
                        <div className="tokenDiv">
                            {showSelect ? (
                                <div className="select_wallet">
                                    <p className="title">
                                        Select wallet destination
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                            className="text-white"
                                            onClick={closeSelectWallet}
                                            role="button"
                                        />
                                    </p>
                                    <div className="select_div">
                                        <Tabs
                                            className="wallet-type__tab"
                                            selectedIndex={tabIndex}
                                            onSelect={(index) => setTabIndex(index)}
                                        >
                                            <TabList>
                                                <Tab className="wallet-type__tab-list">
                                                    NDB WALLET
                                                </Tab>
                                                <Tab className="wallet-type__tab-list">
                                                    OTHER WALLET
                                                </Tab>
                                            </TabList>

                                            <TabPanel>
                                                <></>
                                            </TabPanel>
                                            <TabPanel>
                                                <input
                                                    className="black_input"
                                                    placeholder="Paste Wallet Address"
                                                    value={walletAddress}
                                                    onChange={(e) =>
                                                        setWalletAddress(e.target.value)
                                                    }
                                                />
                                            </TabPanel>
                                        </Tabs>
                                    </div>
                                    <button
                                        className="ndb_button w-100"
                                        onClick={() => alert("ok")}
                                        disabled={paymentDisabled}
                                    >
                                        GO TO PAYMENT
                                    </button>
                                </div>
                            ) : (
                                <div className="buy_token">
                                    <p className="title">
                                        <span className="txt-green">100 USD</span> per token
                                    </p>
                                    <p className="title" style={{ margin: "5px 0" }}>
                                        amount of Token
                                    </p>
                                    <div className="slider-container">
                                        <span className="max">Maximum 10</span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="range-input"
                                            min={0}
                                            max={100000}
                                        />
                                        <Slider
                                            value={amount}
                                            onChange={(value) => setAmount(value)}
                                            min={0}
                                            max={100000}
                                            step={1}
                                        />
                                    </div>
                                    <div className="total-price">
                                        <p className="title">total price</p>
                                        <div className="price">{price}</div>
                                    </div>
                                    <button className="ndb_button w-100" onClick={handleBuyToken}>
                                        BUY
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    ariaHideApp={false}
                    className="signVerify-modal"
                    overlayClassName="signVerify-modal__overlay"
                >
                    <span className="close">
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="text-white modal-close"
                            onClick={() => setModalIsOpen(false)}
                            onKeyDown={() => setModalIsOpen(false)}
                            role="button"
                        />
                    </span>
                    {renderModalContent()}
                </Modal>
            </section>
        </main>
    )
}

export default Auction
