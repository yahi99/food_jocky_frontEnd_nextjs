import React from 'react'
import Layout from "../src/components/layouts/main";
import JobApply from "../src/components/JobApply/JobApply";
import MainLayout from "../components/layout";

const jobapply = () => {
    return (
        <>
            <MainLayout>
                <JobApply/>
            </MainLayout>
        </>
    )
}

export default jobapply
