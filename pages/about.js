import React from 'react'
import Banner from '../src/components/About/Banner'
import WhoWeArea from '../src/components/About/WhoWeAre'
import HowItWork from '../src/components/About/HowItWork'
import OurValues from '../src/components/About/OurValues'
import WhereWeArea from '../src/components/About/WhereWeArea'
import MainLayout from "../components/layout";

const about = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="About Us"/>
                <WhoWeArea/>
                <HowItWork/>
                <OurValues/>
                <WhereWeArea/>
            </MainLayout>
        </>
    )
}

export default about
