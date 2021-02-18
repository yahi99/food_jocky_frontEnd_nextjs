import {SubscriptionClient} from "subscriptions-transport-ws";
import {Client, createClient, defaultExchanges, Provider, subscriptionExchange} from "urql";
import process from "process";
import React from "react";

const ServerUrl = 'https://backend.foodjocky.com/graphql';
const SubscriptionUrl = 'wss://backend.foodjocky.com/graphql';

const subscriptionClient = process.browser ? new SubscriptionClient(SubscriptionUrl, { reconnect: true }) : null;

const graphqlClient = token => {

    return process.browser ? new Client({
        url: ServerUrl,
        fetchOptions: {
            headers: {
                Authorization: `Authorization ${token || ''}`,
            },
        },
        exchanges: [
            ...defaultExchanges,
            subscriptionExchange({
                forwardSubscription(operation) {
                    return subscriptionClient.request(operation);
                },
            }),
        ],
    }) : createClient({
        url: ServerUrl,
        fetchOptions: {
            headers: {
                Authorization: `Authorization ${token || ''}`,
            },
        },
    });
}


export default graphqlClient

export const GraphqlProvider = props => {
    let token = props.token || "abc"
    const client = graphqlClient(token);

    return (
        <Provider value={client}>
            {props.children}
        </Provider>
    );

}
