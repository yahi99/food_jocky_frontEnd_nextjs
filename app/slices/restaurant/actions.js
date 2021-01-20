import {createAsyncThunk} from "@reduxjs/toolkit";
import graphqlClient from "../../graphql";


export const fetchRestaurants = createAsyncThunk('restaurant/fetchRestaurants', async ({lat, lng, name, type}) => {
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
    let client = new graphqlClient()
    const {error, data} = await client.query(query, {lat, lng, name, type}).toPromise()
    if (error) {
        return {error: true, msg: 'Network Failed'}
    }
    const {SearchRestaurants} = data
    return {
        error: SearchRestaurants.error,
        msg: SearchRestaurants.msg,
        data: SearchRestaurants.data
    }
})

export const fetchRestaurant = createAsyncThunk('restaurant/fetchRestaurant', async ({id}) => {
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
    let client = graphqlClient()
    let { error, data } = await client.query(query, {id}).toPromise()
    if (error) {
        return {error: true, msg: 'Network Failed'}
    }
    const {getOneRestaurant} = data
    return getOneRestaurant
})