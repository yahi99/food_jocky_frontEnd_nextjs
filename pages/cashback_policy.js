import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import CashbackPolicy from '../src/components/CashbackPolicy/CashbackPolicy'

const cashback_policy = () => {
 return (
  <>
     <Layout>
     <Banner heading="Cash Back Policy"/>
     <CashbackPolicy/>
    </Layout>
  </>
 )
}

export default cashback_policy
