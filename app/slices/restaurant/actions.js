import {createAsyncThunk} from "@reduxjs/toolkit";
import graphqlClient from "../../graphql";


export const fetchRestaurants = createAsyncThunk('restaurant/fetchRestaurants', async ({lat, lng, name, type, filter}) => {
    let query = `
        query($lat: Float!, $lng: Float!, $name: String!, $type: String, $isFilter: Boolean, $category: [ID], $price_type: String){
            SearchRestaurants(  latitude: $lat, longitude: $lng, name: $name, restaurant_or_homemade: $type , filter: $isFilter, category: $category, price_type: $price_type) {
                error
                msg
                data {
                    allRestaurants {
                        _id
                        name
                        thumb_img
                        tags
                        price_type
                        discount_given_by_restaurant
                        discount_given_by_admin
                    }
                    topRestaurants {
                        _id
                        name
                        thumb_img
                        tags
                        price_type
                        discount_given_by_restaurant
                        discount_given_by_admin
                    }
                    nearestRestaurants {
                        _id
                        name
                        thumb_img
                        tags
                        price_type
                        discount_given_by_restaurant
                        discount_given_by_admin
                    }
                    newRestaurants {
                        _id
                        name
                        thumb_img
                        tags
                        price_type
                        discount_given_by_restaurant
                        discount_given_by_admin
                    }
                }
            }
        }
    `
    let client = new graphqlClient()
    let isFilter = false, category = [], price_type = ''
    if(filter && (filter.categories || filter.price_type)) {
        name = ''
        isFilter = true
        category = filter.categories || []
        price_type = filter.price_type || ''
    }


    const {error, data} = await client.query(query, {lat, lng, name, type, isFilter, category, price_type}).toPromise()
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
                    vat
                    address {
                        address
                        location {
                            lat
                            lng
                        }
                    }
                    discount_given_by_restaurant
                    discount_given_by_admin
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
    let {error, data} = await client.query(query, {id}).toPromise()
    if (error) {
        return {error: true, msg: 'Network Failed'}
    }
    const {getOneRestaurant} = data
    return getOneRestaurant
})

export const categoryRestaurants = createAsyncThunk('restaurant/fetchCategoryRestaurants', async ({id}) => {
    let query = `
        query ($id: ID) {
            getAllRestaurantsByCategory(category_id: $id) {
                error
                msg
                data {
                     _id
                    name
                    thumb_img
                    tags
                    price_type
                    discount_given_by_restaurant
                    discount_given_by_admin
                }
            }
        }
    `
    let client = graphqlClient()
    let {error, data} = await client.query(query, {id}).toPromise()
    if (error) {
        return {error: true, msg: 'Network Failed'}
    }
    const {getAllRestaurantsByCategory} = data
    return getAllRestaurantsByCategory
})