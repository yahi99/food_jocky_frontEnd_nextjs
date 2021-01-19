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
    const { error, data } = await client.query(query, {lat, lng, name, type}).toPromise()
    if(error) { return { error: true, msg: 'Request Failed'} }
    const {SearchRestaurants} = data
    return {
        error: SearchRestaurants.error,
        msg: SearchRestaurants.msg,
        data: SearchRestaurants.data
    }
})