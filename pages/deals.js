import React from 'react'
import Banner from '../src/components/About/Banner'
import Deals from '../src/components/Deals/Deals'
import MainLayout from "../components/layout";

const deals = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="Foodjocky Deals"/>
                <Deals/>
            </MainLayout>
        </>
    )
}

export default deals
