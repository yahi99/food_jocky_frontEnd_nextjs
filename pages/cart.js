import React, {useState} from "react";
import Layout from "../src/components/layouts/main";
import Cart from "../src/components/Cart/Cart";
import Cookies from "js-cookie";
import Loader from "../src/components/Common/Loader";
import {isUser} from "../src/components/auth";

const cart = props => {

    return (
        <>
            <Layout user={props.user}>
                <Loader/>
                <Cart user={props.user}/>
            </Layout>
        </>
    )
}

export default cart;

export async function getServerSideProps(context) {
    let user = await isUser(context);

    return {
        props: {
            user
        }
    }
}
