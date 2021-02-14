import React from 'react'
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import Order_Help from "../src/components/Order_Help/Order_Help";
import MainLayout from "../components/layout";

const order_help = () => {
    return (
        <>
            <MainLayout>
                <Loader/>
                <Order_Help/>
            </MainLayout>
        </>
    )
}

export default order_help
