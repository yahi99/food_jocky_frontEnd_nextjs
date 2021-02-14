import React from 'react'
import Banner from '../src/components/About/Banner'
import Corporate_customer from '../src/components/Corporate_Customer/Corporate_customer'
import MainLayout from "../components/layout";

const corporate_customer = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="Corporate Customer"/>
                <Corporate_customer/>
            </MainLayout>
        </>
    )
}

export default corporate_customer
