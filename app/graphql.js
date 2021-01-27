import {SubscriptionClient} from "subscriptions-transport-ws";
import {Client, createClient, defaultExchanges, subscriptionExchange} from "urql";
import process from "process";

const ServerUrl = 'https://dev.foodjocky.com/graphql';
const SubscriptionUrl = 'wss://dev.foodjocky.com/graphql';

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