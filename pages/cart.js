import React, {useState} from "react";
import Layout from "../src/components/layouts/main";
import Cart from "../src/components/Cart/Cart";
import Loader from "../src/components/Common/Loader";
import {isUser} from "../src/components/auth";
import {getSettings} from "../src/components/restaurant/Restaurants";

const cart = props => {

    return (
        <>
            <Layout user={props.user}>
                <Loader/>
                <Cart user={props.user} settings={props.settings}/>
            </Layout>
        </>
    )
}

export default cart;

export async function getServerSideProps(context) {
    let allSettings = await getSettings()
    let user = await isUser(context);

    if(!user.authenticated) {
        context.res.writeHeader(307, { Location: "/login" });
        context.res.end()
    }

    if( user.user.last_order && (user.user.last_order.status == 'pending' || user.user.last_order.status == 'accepted' || user.user.last_order.status == 'delivered')) {
        context.res.writeHeader(307, { Location: "/check_out" });
        context.res.end()
    }

    let settings = {
        delivery_charge: allSettings.delivery_charge || 0
    }


    return {
        props: {
            settings,
            user
        }
    }
}
