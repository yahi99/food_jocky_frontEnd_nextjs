import {useQuery, useSubscription} from "urql";
import React from "react";
import {getAOrder} from "../restaurant/Restaurants";
import Cookies from 'js-cookie';

const UpdateOrder = props => {
    let query = `
        subscription($token: String!) {
            orderUpdated(token: $token) {
                data {
                    _id
                }
            }
        }
    `
    const handleSubscription = (orders = [], response) => {
        return [response.orderUpdated, ...orders];
    }

    const [res] = useSubscription({ query: query, variables: {token: Cookies.get('token')} }, handleSubscription);

    if (!res.data) {
        return <></>;
    }

    getAOrder( Cookies.get('token'), props.id).then(result => {
        if( ! result.error) {
            props.setOrder(result.data)
        }
    })

    return <></>;
}
export default UpdateOrder
