import React from 'react'
import Layout from "../src/components/layouts/main";
import Banner from '../src/components/About/Banner'
import Support from '../src/components/Support/Support'
import MainLayout from "../components/layout";

const support = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="Support"/>
                <Support/>
            </MainLayout>
        </>
    )
}

export default support
