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

    if(!user.authenticated) {
        context.res.writeHeader(307, { Location: "/login" });
        context.res.end()
    }

    if( user.user.last_order && (user.user.last_order.status == 'pending' || user.user.last_order.status == 'accepted' || user.user.last_order.status == 'delivered')) {
        context.res.writeHeader(307, { Location: "/check_out" });
        context.res.end()
    }

    return {
        props: {
            user
        }
    }
}
