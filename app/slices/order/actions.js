import {createAsyncThunk} from "@reduxjs/toolkit";
import graphqlClient from "../../graphql";
import Cookies from 'js-cookie'

export const fetchSettings = createAsyncThunk('order/fetchSettings', async ({}) => {
    let query = `
        query {
            getSettings {
                error
                msg
                data {
                    google_map_api_key
                    rider_extra_time
                    restaurant_extra_time
                    customer_vat
                    rider_cost
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

export const placeOrder = createAsyncThunk('order/placeOrder', async ({order}) => {
    let mutation = `
        mutation( $order: OrderInput ) {
            addOrder( orderInput: $order ) {
                error
                msg
            }
        }
    `
    console.log(order)
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let {error, data} = await client.mutation(mutation, {order}).toPromise()
    if (error) {
        return {error: true, msg: 'Network failed'}
    }
    let {addOrder} = data
    return {
        error: addOrder.error,
        msg: addOrder.msg
    }
})

export const fetchOrder = createAsyncThunk('order/fetch', async ({id}) => {
    let query = `
        query($id: ID) {
            getOneOrder(_id: $id) {
                error
                data {
                    _id
                    restaurant {
                        name
                    }
                    delivery_info {
                        floor_no
                        house_no
                        reciver_name
                        reciver_mobile_no
                        address {
                            address
                        }
                    }
                    total
                    sub_total
                    vat
                    customer_discount_amount
                    delivery_charge
                    items {
                        name
                        quantity
                        price
                        size
                    }
                    status
                    delivery_time
                }
            }
        }
    `
    let token = Cookies.get('fj_token')
    let client = graphqlClient(token)
    let {error, data} = await client.query(query, {id}).toPromise()
    if (error) {
        return {error: true, msg: 'Network failed'}
    }
    let {getOneOrder} = data
    return {
        error: getOneOrder.error,
        msg: getOneOrder.msg,
        data: getOneOrder.data
    }
})

export const getDistance = createAsyncThunk('order/fetchDistance', async ({lat1, lng1, lat2, lng2}) => {
    let query = `
       query($lat1: Float, $lng1: Float, $lat2: Float, $lng2: Float) {
            getDistanceFromLatLng(customer_lat: $lat1, customer_lng: $lng1, restaurant_lat: $lat2, restaurant_lng: $lng2){
                error
                msg
                data {
                    distance
                }
            }
        }
    `
    let client = graphqlClient()
    let {error, data} = await client.query(query, {lat1, lng1, lat2, lng2}).toPromise()
    if (error) {
        return {error: true, msg: 'Network failed'}
    }
    let {getDistanceFromLatLng} = data
    return {
        error: getDistanceFromLatLng.error,
        msg: getDistanceFromLatLng.msg,
        data: getDistanceFromLatLng.data
    }
})