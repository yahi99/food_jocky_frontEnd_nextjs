import React, {useEffect, useRef, useState} from 'react'
import MainLayout from "../../components/layout";
import Sidebar from "../../components/user/sidebar";
import {Form, Input} from "antd";
import {useRouter} from "next/router";
import graphqlClient from "../../app/graphql";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import {fetchWallet} from "../../app/slices/user/actions";
import {useDispatch} from "react-redux";

const wallet = () => {
    let router = useRouter()
    let dispatch = useDispatch()
    const [form] = Form.useForm()
    let [payAmount, setPayAmount] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            dispatch(fetchWallet(({})))
        }
    })


    const setAmount = value => {
        form.setFieldsValue({
            amount: value
        })
    }
    const handleSubmit = async value => {
        let mutation = `
            mutation ($amount: Int,$url: String) {
                addBalance(amount: $amount, url: $url) {
                    error
                    msg
                    data {
                        transaction_id
                        GatewayPageURL
                    }
                }
            }
        `
        let client = graphqlClient(Cookies.get('fj_token'))
        let {error, data} = await client.mutation(mutation, {amount: +value.amount, url: 'http://localhost:3050/user/payment_verify'}).toPromise()
        if(error) {
            await Swal.fire('Error', 'Network failed', 'error')
        } else {
            let { addBalance } =  data
            if(addBalance.error) {
                await Swal.fire('Error', addBalance.msg, 'error')
            } else {
                Cookies.set('fj_transaction_id', addBalance.data.transaction_id)
                await router.push(addBalance.data.GatewayPageURL)
            }
        }
    }

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
                                                  form={form}
                                                  requiredMark={false}
                                                  onFinish={handleSubmit}>
                                                <div className="add_wallet_input ">
                                                    <Form.Item
                                                        name="amount"
                                                        rules={
                                                            [
                                                                { required: true, message: 'Please input your Amount!' },
                                                                { pattern: /^[1-9]\d*$/, message: 'Please input only full amount!' }
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
