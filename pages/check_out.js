import React from 'react'
import Layout from "../src/components/layouts/main";
import Checkout from '../src/components/CheckOut/checkout'
import {getToken, isUser} from "../src/components/auth";
import {getAOrder} from "../src/components/restaurant/Restaurants";

 const check_out = props => {
    return (
        <>
            <Layout user={props.user}>
                <Checkout order={props.order}/>
            </Layout>
        </>
    )
 }
 export default check_out


export async function getServerSideProps(context) {
    let user = await isUser(context);
    let token = getToken(context);
    if((!user.authenticated) || (!user.user.last_order)) {
        context.res.writeHeader(307, { Location: "/" });
        context.res.end()
    }

    let order = await getAOrder(token, user.user.last_order._id);
    if(order.error) {
        context.res.writeHeader(307, { Location: "/" });
        context.res.end()
    }
    return {
        props: {
            user,
            order: order.data
        }
    }
}
