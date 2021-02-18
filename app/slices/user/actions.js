import {createAsyncThunk} from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import graphqlClient from "../../graphql";
import axios from "axios";

export const fetchHomepageData =  createAsyncThunk('user/fetchDashboard', async ({}) => {
    let query = `
        query {
            getHomePageData {
                error
                msg
                data {
                    populat_category {
                        _id
                        image_url
                        name
                        restaurant_count
                    }
                }
            }
        }
    `
    let client = graphqlClient()
    let { error, data } = await client.query(query).toPromise()
    if(error) {
        return {error: true, msg: 'Network failed'}
    }
    let {getHomePageData} = data
    return {
        error: getHomePageData.error,
        msg: getHomePageData.msg,
        data: getHomePageData.data
    }
})

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
                        profile_picture
                    }
                }
            }
        `
    let token = Cookies.get('fj_token')
    if( token ) {
        let client = graphqlClient();
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

export const userUpdate = createAsyncThunk('user/register', async ({user}) => {
    let mutation = `
        mutation ($user: CustomerInput){
            updateCustomer(customerInput: $user) {
                error
                msg
            }
        }
    `
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let { error, data } = await client.mutation(mutation, {user}).toPromise()
    if(error) {
        return {error: true, msg: 'Network failed'}
    }
    let {updateCustomer} = data
    return {
        error: updateCustomer.error,
        msg: updateCustomer.msg
    }
})

export const uploadProfilePicture = createAsyncThunk('user/uploadProfilePicture', async ({file}) => {
    let url = await uploadImage(file)
    if(url.length > 5) {
        let mutation = `
            mutation($url: String) {
                updateCustomerProfilePicture(profile_picture: $url) {
                    error
                    msg
                }
            }
        `
        let token = Cookies.get('fj_token')
        let client = graphqlClient(token)
        let { error, data } = await client.mutation(mutation, {url}).toPromise()
        if(error) {
            return {error: true, msg: 'Network failed'}
        }
        let {updateCustomerProfilePicture} = data
        return {
            error: updateCustomerProfilePicture.error,
            msg: updateCustomerProfilePicture.msg
        }

    }
})


export const fetchDashboardData = createAsyncThunk('user/fetchDashboardData', async ({}) => {
    let query = `
        query {
            getCustomerDashboardData {
                error
                msg
                data {
                    totalOrders
                    pendingOrders
                    orders {
                        _id
                        sub_total
                        delivery_charge
                        createdAt
                        total
                        status
                        vat
                        restaurant {
                            name
                        }
                        items {
                            name
                            size
                            quantity
                            price
                        }
                    }
                }
            }
        }
    `
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let { error, data } = await client.query(query).toPromise()
    if(error) {
        return {error: true, msg: 'Network failed'}
    }
    let {getCustomerDashboardData} = data
    return {
        error: getCustomerDashboardData.error,
        msg: getCustomerDashboardData.msg,
        data: getCustomerDashboardData.data
    }

})

export const fetchWallet = createAsyncThunk('user/fetchWallet', async ({}) => {
    let query = `
        query{
            getWalletPageData {
                error
                data {
                    balance
                    totalCredit
                    totalDebit
                    transactions {
                        _id
                        current_balance
                        previous_balance
                        status
                        debit_or_credit
                        amount
                        cashback
                        cashback_percentange
                        createdAt
                        updatedAt
                    }
                }
            }
        }
    `
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let { error, data } = await client.query(query).toPromise()
    if(error) {
        return {error: true, msg: 'Network failed'}
    }
    let {getWalletPageData} = data
    return {
        error: getWalletPageData.error,
        msg: getWalletPageData.msg,
        data: getWalletPageData.data
    }
})

export const confirmTransaction = createAsyncThunk('user/confirmPayment', async ({id}) => {
    let mutation = `
        mutation ($id: ID){
            trackTransaction(_id: $id){
                error
                msg
                data {
                    status
                }
            }
        }
    `
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let { error, data } = await client.mutation(mutation, {id}).toPromise()
    if(error) {
        return {error: true, msg: 'Network failed'}
    }
    let {trackTransaction} = data
    return {
        error: trackTransaction.error,
        msg: trackTransaction.msg,
        data: trackTransaction.data
    }

})


export const uploadImage = async (file) => {
    try {
        const data = new FormData()
        data.append('image', file)
        let url = `https://api.imgbb.com/1/upload?key=${process.env.imgbb_key}`;
        const res = await axios.post(url, data, {})
        if (res.data.success) {
            return res.data.data.image.url
        }
    } catch (e) {
        return ''
    }
}

