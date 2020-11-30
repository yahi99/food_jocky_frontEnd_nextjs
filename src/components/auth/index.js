import {UrqlClient} from "../urql/urql-provider";
import cookie from "cookie";

const getToken = context => {
    if(! (context.req.headers && context.req.headers.cookie ) ) {
        return undefined;
    }
    const cookies = cookie.parse(context.req.headers.cookie);
    return cookies.token;
}

export {getToken}


const getQuery = context => {
    const url = require('url');
    const parsedUrl = url.parse(context.req.url, true);
    return parsedUrl.query;
}

export {getQuery}

export const isUser = async context => {
    let token = getToken(context);
    if( typeof token === "string" ) {
        let query = `
            query($token: String!){
                verifyCustomerToken(token: $token) {
                    error
                    msg
                    data {
                        first_name
                        last_name
                        last_order {
                            _id
                            status
                        }
                    }
                }
            }
        `
        let client = UrqlClient();
        let response = await client.query(query, {token}).toPromise();

        if( !(response.error || response.data.verifyCustomerToken.error) ) {
            return {
                authenticated: true,
                user: response.data.verifyCustomerToken.data
            }
        }
    }
    return {
        authenticated: false
    }

}
