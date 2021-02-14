import React from 'react'
import Banner from '../src/components/About/Banner'
import CashbackPolicy from '../src/components/CashbackPolicy/CashbackPolicy'
import MainLayout from "../components/layout";

const cashback_policy = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="Cash Back Policy"/>
                <CashbackPolicy/>
            </MainLayout>
        </>
    )
}

export default cashback_policy
