import {createAsyncThunk} from "@reduxjs/toolkit";
import {UrqlClient} from "../../../src/components/urql/urql-provider";
import Cookies from 'js-cookie'
import graphqlClient from "../../graphql";

export const fetchUser = createAsyncThunk('user/fetch', async ({}) => {
    let query = `
            query($token: String!){
                verifyCustomerToken(token: $token) {
                    error
                    msg
                    data {
                        first_name
                        last_name
                        email
                        mobile
                        last_order {
                            _id
                            status
                        }
                    }
                }
            }
        `
    let token = Cookies.get('fj_token')
    if( token ) {
        let client = UrqlClient();
        let {error, data} = await client.query(query, {token}).toPromise();
        if (error) {
            return {error: true, msg: 'Network failed'}
        }
        let {verifyCustomerToken} = data
        if(verifyCustomerToken.error) {
            Cookies.remove('fj_token')
        }
        return {
            error: verifyCustomerToken.error,
            msg: verifyCustomerToken.msg,
            data: verifyCustomerToken.data
        }
    }
    return {error: true, msg: 'No token available'}

})

export const userLogin = createAsyncThunk('user/login', async ({phone, password}) => {
    let query = `
        query ($phone: String!, $password: String!) {
            customerLogin(mobile: $phone, password: $password){
                error
                msg
                token
            }
        }
    `
    let client = graphqlClient()
    let { error, data } = await client.query(query, {phone, password}).toPromise()
    if(error) {
        return {error: true, msg: 'Network failed'}
    }
    let {customerLogin} = data
    Cookies.set('fj_token', customerLogin.token)
    return {
        error: customerLogin.error,
        msg: customerLogin.msg
    }
})

export const userRegister = createAsyncThunk('user/register', async ({user}) => {
    let mutation = `
        mutation($user: CustomerInput!){
            addCustomer(customerInput: $user) {
                error
                msg
                token
            }
        }
    `
    let client = graphqlClient()
    let { error, data } = await client.mutation(mutation, {user}).toPromise()
    if(error) {
        return {error: true, msg: 'Network failed'}
    }
    let {addCustomer} = data
    Cookies.set('fj_token', addCustomer.token)
    return {
        error: addCustomer.error,
        msg: addCustomer.msg
    }
})