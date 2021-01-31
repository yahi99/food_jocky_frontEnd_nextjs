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

    let total = 0

    let items = cart.foods.map(order => {
        total += order.quantity * order.price
        return {
            _id: order.food_id,
            category_id: order.category_id,
            name: order.food_name,
            price: order.price,
            quantity: order.quantity,
            size: order.size
        }
    })
    let newOrder = {
        delivery_charge: props.settings.delivery_charge,
        sub_total: total,
        total: total + props.settings.delivery_charge,
        restaurant: order.restaurant_id,
        items: items,
        delivery_info: {
            _id: location._id,
            title: location.title,
            address: {
                address: location.address.address,
                location: {
                    lat: location.address.location.lat,
                    lng: location.address.location.lng
                }
            },
            reciver_mobile_no: location.reciver_mobile_no,
            reciver_name: location.reciver_name,
            house_no: location.house_no,
            floor_no: location.floor_no,
            note_to_rider: location.note_to_rider
        }
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
                        address {
                            address
                        }
                    }
                    total
                    sub_total
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