import React from 'react'
import Layout from "../src/components/layouts/main";
import Loader from "../src/components/Common/Loader";
import Banner from "../src/components/Rider/Banner";
import RiderIntro from "../src/components/Rider/RiderIntro";
import RiderAreaLeft from "../src/components/Rider/RiderAreaLeft";
import RiderAreaRight from "../src/components/Rider/RiderAreaRight";
import AdditionalArea from "../src/components/Rider/AdditionalArea";
import Cta from "../src/components/Rider/Cta";
import SomeThings from "../src/components/Rider/SomeThings";

const become_rider = () => {
 return (
  <>
    <Layout>
            <Loader/>
            <Banner/>
            <RiderIntro/>
            <RiderAreaLeft heading="Earn an attractive salary" title="Earn up to Tk.25000 per month." src="/assets/img/rider/delvery.jpg" />
            <RiderAreaRight/>
            <RiderAreaLeft heading="Ride and earn" title="If you love riding, this job is perfect for you. Turn your passion for riding into an income source." src="/assets/img/rider/delvery3.jpg"/>
            <AdditionalArea/>
            <Cta/>
            <SomeThings/>
        </Layout>
  </>
 )
}

export default become_rider
