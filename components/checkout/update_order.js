import {useSubscription} from "urql";
import React from "react";
import Cookies from 'js-cookie';
import {fetchOrder} from "../../app/slices/order/actions";
import {useDispatch} from "react-redux";

const UpdateOrder = ({id}) => {
    let dispatch = useDispatch()
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
        dispatch(fetchOrder({id}))
        return [response.orderUpdated, ...orders];
    }

    useSubscription({ query: query, variables: {token: Cookies.get('token')} }, handleSubscription);
    return <></>;
}
export default UpdateOrder
