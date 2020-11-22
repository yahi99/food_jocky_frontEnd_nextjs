import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Privacy from '../src/components/Privacy/Privacy'
const privacy = () => {
 return (
  <>
    <Layout>
     <Banner heading="Privacy Policy"/>
     <Privacy/>
    </Layout>
  </>
 )
}

export default privacy
