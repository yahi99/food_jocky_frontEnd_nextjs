import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Security from '../src/components/Security/Security'
const security = () => {
 return (
  <> 
     <Layout>
     <Banner heading="Security"/>
     <Security/>
    </Layout>
     
  </>
 )
}

export default security
