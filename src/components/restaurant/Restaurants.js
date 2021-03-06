import {UrqlClient} from "../urql/urql-provider";
import Cookies from 'js-cookie'

const restaurantSearch = async (lat, lng, name, type) => {
    let query = `
        query($lat: Float!, $lng: Float!, $name: String!, $type: String){
            SearchRestaurants(  latitude: $lat, longitude: $lng, name: $name, restaurant_or_homemade: $type ) {
                error
                msg
                data{
                    _id
                    name
                    thumb_img
                    tags
                    price_type
                }
            }
        }
    `
    let client = UrqlClient();
    let request = client.query(query, {lat, lng, name, type}).toPromise();
    let response = await request;
    if(response.error || response.data.SearchRestaurants.error ) {
        return []
    }
    return response.data.SearchRestaurants.data

}

export {restaurantSearch}


const getRestaurant = async id => {
    let query = `
        query ($id: ID!) {
            getOneRestaurant(_id: $id) {
                error
                msg
                data {
                    _id
                    name
                    tags
                    cover_img
                    price_type
                    description
                    address {
                        address
                        location {
                            lat
                            lng
                        }
                    }
                    food_categories{
                        _id
                        name
                        foods {
                            _id
                            name
                            price
                            description
                            dish_img
                            price_and_size {
                                size
                                price
                            }
                        }
                    }
                }
            }
        }
    `
    let client = UrqlClient();
    let request = client.query(query, {id}).toPromise();
    let response = await request;
    if(response.error || response.data.getOneRestaurant.error) {
        return {
            error: true
        }
    }
    return {
        error: false,
        data: response.data.getOneRestaurant.data
    }
}

export {getRestaurant}


export const addOrder = async order => {
    let query = `
        mutation( $order: OrderInput ) {
            addOrder( orderInput: $order ) {
                error
                msg
            }
        }
    `
    let client = UrqlClient(Cookies.get('token'));
    let result = await client.mutation(query, {order}).toPromise();
    if(result.error) {
        return {
            error: true,
            msg: 'Request Failed, Check your network connection !'
        }
    }
    return {
        error: result.data.addOrder.error,
        msg: result.data.addOrder.msg
    }
}


export const getAOrder = async (token, id) => {
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
    let client = UrqlClient(token);
    let result = await client.mutation(query, {id}).toPromise();
    if(result.error || result.data.getOneOrder.error ) {
        return {
            error: true,
        }
    }
    return {
        error: result.data.getOneOrder.error,
        data: result.data.getOneOrder.data
    }
}


export const getSettings = async () => {
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
    let client = UrqlClient()
    let result = await client.query(query).toPromise()
    if(result.error || result.data.getSettings.error ) {
        return {

        }
    }
    return result.data.getSettings.data
}