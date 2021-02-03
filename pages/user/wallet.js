import React, {useEffect, useRef, useState} from 'react'
import MainLayout from "../../components/layout";
import Sidebar from "../../components/user/sidebar";
import {Form, Input, Progress, Slider, Table} from "antd";
import {useRouter} from "next/router";
import graphqlClient from "../../app/graphql";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import {fetchWallet} from "../../app/slices/user/actions";
import {useDispatch, useSelector} from "react-redux";
import dateformat from 'dateformat'

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

    const wallet = useSelector(state => state.user.wallet)


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

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date, _) => (
                <p>{dateformat(+date, 'dd mmm,yyyy')}</p>
            )
        },
        {
            title: 'Time',
            dataIndex: 'date',
            key: 'time',
            render: (date, _) => (
                <p>{dateformat(+date, 'hh:MM tt')}</p>
            )
        },
        {
            title: 'Wallet',
            dataIndex: 'wallet',
            key: 'wallet',
        },
        {
            title: 'Debit',
            dataIndex: 'debit',
            key: 'debit',
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Cashback',
            dataIndex: 'cashback',
            key: 'cashback',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: 'text-center',
            key: 'status',
            render: (status, record) => {
                if(status === 'pending')
                    return <span className="btn btn-warning btn-sm shadow-none rounded"> Pending </span>
                if(status === 'success')
                    return <span className="btn btn-primary btn-sm shadow-none"> Success </span>
                if(status === 'cancelled')
                    return <span className="btn btn-danger btn-sm shadow-none"> Cancelled </span>

                return <></>
            }
        }
    ];

    const getPercentages = () => {
        try {
            return 100 - (+wallet.totalCredit / +wallet.totalDebit) * 100
        } catch (e) {
            return 0
        }
    }

    let data = []
    if(wallet.transactions) {
        data = wallet.transactions.map((transition, index) => {
            return {
                key: index + 1,
                date: transition.createdAt,
                wallet: transition.current_balance,
                debit: transition.debit_or_credit === 'debit' ? transition.amount : 0,
                credit: transition.debit_or_credit === 'credit' ? transition.amount : 0,
                cashback: transition.cashback,
                status: transition.status
            }
        })
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
                                                <h4>BDT {wallet.balance}</h4>
                                            </div>
                                            <div className="wallet_balance_flex">
                                                <div className="wallet_balance_area">
                                                    <p>Total Credit</p>
                                                    <h4>BDT {wallet.totalCredit}</h4>
                                                </div>
                                                <div className="wallet_balance_area">
                                                    <p>Total Debit</p>
                                                    <h4>BDT {wallet.totalDebit}</h4>
                                                </div>
                                            </div>
                                            <div className="wallet_range_bar">
                                                <div className="my-3">
                                                    <Progress percent={getPercentages()} strokeWidth={20} strokeColor="#c8102f" showInfo={true}/>
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
                                    <div className="">
                                        <Table columns={columns} pagination={{pageSize: 5}} dataSource={data} >
                                        </Table>
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
