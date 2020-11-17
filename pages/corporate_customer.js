import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Corporate_customer from '../src/components/Corporate_Customer/Corporate_customer'
const corporate_customer = () => {
 return (
  <> 
    <Layout>
     <Banner heading="Corporate Customer"/>
     <Corporate_customer />
    </Layout>
  </>
 )
}

export default corporate_customer
