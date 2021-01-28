import React, {useEffect, useRef, useState} from 'react'
import MainLayout from "../../components/layout";
import Sidebar from "../../components/user/sidebar";
import {Form, Input} from "antd";
import axios from "axios";


const wallet = () => {
    const form = useRef(null)
    let [payAmount, setPayAmount] = useState(0)
    const setAmount = value => {
        form.current.setFieldsValue({
            amount: value
        })
    }
    const handleSubmit = async value => {
        let payBtn = document.getElementById('sslczPayBtn')
        payBtn.click()
    }

    useEffect(() => {
        let loader = function () {
            let script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
            script.src = "https://sandbox.sslcommerz.com/embed.min.js?" + Math.random().toString(36).substring(7);
            tag.parentNode.insertBefore(script, tag);
        };
        window.addEventListener("load", loader, false)
    })

    return (
        <MainLayout>
            <section id="wallet_area">
                <div className="container">
                    <div className="row">
                        <Sidebar/>
                        <div className="col-lg-8 col-sm-12 col-md-8 col-12">
                            <div className="all_wallets_wrappers">
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="boxshadow_Wallet">
                                            <div className="common_wallet_heading">
                                                <h3>Wallet</h3>
                                            </div>
                                            <div className="wallet_balance_area">
                                                <p>Wallet Balance</p>
                                                <h4>$345.90</h4>
                                            </div>
                                            <div className="wallet_balance_flex">
                                                <div className="wallet_balance_area">
                                                    <p>Total Credit</p>
                                                    <h4>$335445.90</h4>
                                                </div>
                                                <div className="wallet_balance_area">
                                                    <p>Total Debit</p>
                                                    <h4>$34d78745.60</h4>
                                                </div>
                                            </div>
                                            <div className="wallet_range_bar">
                                                <div className="top_range_bar">
                                                    <p>$478545</p>
                                                    <p>$478545</p>
                                                </div>
                                                <div className="main_range_bar">
                                                    <span>45%.44</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="boxshadow_Wallet">
                                            <div className="common_wallet_heading">
                                                <h3>Add Wallet</h3>
                                            </div>
                                            <Form layout="vertical"
                                                  ref={form}
                                                  requiredMark={false}
                                                  onFinish={handleSubmit}>
                                                <div className="add_wallet_input ">
                                                    <Form.Item
                                                        name="amount"
                                                        rules={
                                                            [
                                                                { required: true, message: 'Please input your Amount!' },
                                                                { pattern: /\d+(\.\d{1,2})?/, message: 'Please input a valid amount!' }
                                                            ]
                                                        }
                                                    >
                                                        <Input addonBefore="BDT" value={payAmount} onChange={e => setPayAmount(e.target.value)}  maxLength={10}/>
                                                    </Form.Item>
                                                </div>
                                                <div className="add_wallet_button">
                                                    <span>OR</span>
                                                    <div className="add_wallet_main_button">
                                                        <button type="button" className="btn button-site" onClick={() => setAmount(50)}>BDT 50</button>
                                                        <button type="button" className="btn button-site" onClick={() => setAmount(100)}>BDT 100</button>
                                                        <button type="button" className="btn button-site" onClick={() => setAmount(150)}>BDT 150</button>
                                                    </div>
                                                    <div className="add_wallet_submit_button">
                                                        <button className="btn button-site" type="submit">Add to Wallet</button>
                                                    </div>
                                                </div>
                                            </Form>

                                            <button
                                                className="d-none"
                                                id="sslczPayBtn"
                                                postdata={JSON.stringify({amount: payAmount})}
                                                endpoint="http://localhost:3500/payment"
                                                order={{}}
                                            >Add to Wallet</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="wallets_table">
                                    <h3>Wallet Transactions</h3>
                                    <div className="table-responsive">


                                        <table className="table">
                                            <tr>
                                                <th>S.NO</th>
                                                <th>Date</th>
                                                <th>Wallet</th>
                                                <th>Credit</th>
                                                <th>Debit</th>
                                                <th>Txt amt</th>
                                                <th>Available</th>
                                                <th>Reason</th>
                                                <th>Status</th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>22 jul 2020</td>
                                                <td>$576.2</td>
                                                <td>$0</td>
                                                <td>$200</td>
                                                <td>$0</td>
                                                <td>$567.6</td>
                                                <td>Booked a Service</td>
                                                <td><span>Debit</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>22 jul 2020</td>
                                                <td>$576.2</td>
                                                <td>$0</td>
                                                <td>$200</td>
                                                <td>$0</td>
                                                <td>$567.6</td>
                                                <td>Booked a Service</td>
                                                <td><span>Debit</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>22 jul 2020</td>
                                                <td>$576.2</td>
                                                <td>$0</td>
                                                <td>$200</td>
                                                <td>$0</td>
                                                <td>$567.6</td>
                                                <td>Booked a Service</td>
                                                <td><span>Debit</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>22 jul 2020</td>
                                                <td>$576.2</td>
                                                <td>$0</td>
                                                <td>$200</td>
                                                <td>$0</td>
                                                <td>$567.6</td>
                                                <td>Booked a Service</td>
                                                <td><span>Debit</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>22 jul 2020</td>
                                                <td>$576.2</td>
                                                <td>$0</td>
                                                <td>$200</td>
                                                <td>$0</td>
                                                <td>$567.6</td>
                                                <td>Booked a Service</td>
                                                <td><span>Debit</span></td>
                                            </tr>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default wallet
