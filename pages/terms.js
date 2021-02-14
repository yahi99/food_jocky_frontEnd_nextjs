import React from 'react'
import Banner from '../src/components/About/Banner'
import Terms from '../src/components/Terms/Terms'
import MainLayout from "../components/layout";

const terms = () => {
    return (
        <>
            <MainLayout>
                <Banner heading="Terms And Conditions"/>
                <Terms/>
            </MainLayout>
        </>
    )
}

export default terms
