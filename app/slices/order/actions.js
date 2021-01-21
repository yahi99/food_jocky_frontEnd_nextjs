import {createAsyncThunk} from "@reduxjs/toolkit";
import graphqlClient from "../../graphql";
import Cookies from 'js-cookie'

export const fetchDeliveryAmount = createAsyncThunk('order/fetch_delivery_amount', async ({}) => {
    let query = `
        query {
            getSettings {
                error
                msg
                data {
                    delivery_charge
                }
            }
        }
    `
    let client = graphqlClient()
    let {error, data} = await client.query(query).toPromise()
    if (error) {
        return {error: true, msg: 'Network failed'}
    }
    let {getSettings} = data
    return getSettings
})

export const addDeliveryAddress = createAsyncThunk('order/add_delivery_address', async ({address}) => {
    let mutation = `
        mutation($address: CustomerAddress) {
            addCustomerLocation(customerAddress: $address) {
                error
                msg
            }
        }
    `
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let {error, data} = await client.mutation(mutation, {address}).toPromise()
    if (error) {
        return {error: true, msg: 'Network failed'}
    }
    let {addCustomerLocation} = data
    return addCustomerLocation

})

export const fetchDeliveryAddresses = createAsyncThunk('order/fetch_delivery_addresses', async ({}) => {
    let query = `
        query {
            getAllCustomerLocations {
                error
                msg
                data {
                    _id
                    title
                    address {
                        address
                        location {
                            lat
                            lng
                        }
                    }
                    reciver_name
                    reciver_mobile_no
                    house_no
                    floor_no
                    note_to_rider
                }
            }   
        }   
    `
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let {error, data} = await client.query(query).toPromise()
    if (error) {
        return {error: true, msg: 'Network failed'}
    }
    let {getAllCustomerLocations} = data
    return getAllCustomerLocations
})

export const deleteDeliveryAddress = createAsyncThunk('order/delete_delivery_address', async ({id}) => {
    let mutation = `
        mutation($id: ID) {
            deleteCustomerLocation(_id: $id) {
                error
                msg
            }
        }
    `
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let {error, data} = await client.mutation(mutation, {id}).toPromise()
    if (error) {
        return {error: true, msg: 'Network failed'}
    }
    let {deleteCustomerLocation} = data
    return deleteCustomerLocation
})

export const placeOrder = createAsyncThunk('order/placeOrder', async ({cart, delivery_address}) => {
    console.log(cart, delivery_address)


})