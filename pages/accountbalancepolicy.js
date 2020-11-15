import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import AccountBalance from '../src/components/AccountBalancePolicy/AccountBalance'

const accountbalancepolicy = () => {
 return (
  <>
    <Layout>
     <Banner heading="ACCOUNT BALANCE POLICY"/>
     <AccountBalance/>
    </Layout>
  </>
 )
}

export default accountbalancepolicy
