import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Privacy from '../src/components/Privacy/Privacy'
import MainLayout from "../components/layout";

const privacy = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="Privacy Policy"/>
                <Privacy/>
            </MainLayout>
        </>
    )
}

export default privacy
