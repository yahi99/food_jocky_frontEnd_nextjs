import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Deals from '../src/components/Deals/Deals'
const deals = () => {
 return (
  <>
    <Layout>
     <Banner heading="Foodjocky Deals"/>
     <Deals/>
    </Layout>
  </>
 )
}

export default deals
