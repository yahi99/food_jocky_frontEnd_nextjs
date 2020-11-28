import React, {useState} from "react";
import Layout from "../src/components/layouts/main";
import Cart from "../src/components/Cart/Cart";
import Cookies from "js-cookie";
import Loader from "../src/components/Common/Loader";

const cart = () => {

    return (
        <>
            <Layout>
                <Loader/>
                <Cart/>
            </Layout>
        </>
    )
}

export default cart;
