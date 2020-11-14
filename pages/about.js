import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import WhoWeArea from '../src/components/About/WhoWeAre'
import HowItWork from '../src/components/About/HowItWork'
import OurValues from '../src/components/About/OurValues'
import WhereWeArea from '../src/components/About/WhereWeArea'
const about = () => {
 return (
  <>
    <Layout>
     <Banner heading="About Us"/>
     <WhoWeArea/>
     <HowItWork/>
     <OurValues/>
     <WhereWeArea/>
    </Layout>
  </>
 )
}

export default about
