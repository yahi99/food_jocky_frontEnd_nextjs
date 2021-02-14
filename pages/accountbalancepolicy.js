import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import AccountBalance from '../src/components/AccountBalancePolicy/AccountBalance'
import MainLayout from "../components/layout";

const accountbalancepolicy = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="ACCOUNT BALANCE POLICY"/>
                <AccountBalance/>
            </MainLayout>
        </>
    )
}

export default accountbalancepolicy
