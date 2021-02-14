import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Security from '../src/components/Security/Security'
import MainLayout from "../components/layout";

const security = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="Security"/>
                <Security/>
            </MainLayout>

        </>
    )
}

export default security
