import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Support from '../src/components/Support/Support'

const support = () => {
 return (
  <>
     <Layout>
     <Banner heading="Support"/>
     <Support/>
    </Layout>
  </>
 )
}

export default support
