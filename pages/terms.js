import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Terms from '../src/components/Terms/Terms'
const terms = () => {
 return (
  <>
    <Layout>
     <Banner heading="Terms And Conditions"/>
     <Terms/>
    </Layout>
  </>
 )
}

export default terms
