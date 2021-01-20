import {fetchRestaurant, fetchRestaurants} from "./actions";
import Cookies from 'js-cookie'

const reducers = {
    reducers: {
        reloadRestaurants(state, action) {
            state.restaurants.loading = true
        },
        addToCart(state, action) {
            let {cart, restaurant } = action.payload
            if (cart.restaurant_id === restaurant._id) {
                let foods = cart.foods
                let hasFood = false
                foods = foods.map( food => {
                    if( food._id == action.payload._id ) {
                        if( food.size === action.payload.size) {
                            hasFood = true
                            return {
                                ...food,
                                quantity: food.quantity + 1
                            }
                        }
                    }
                    return food
                })
                if(!hasFood) {
                    foods.push({
                        _id: action.payload._id,
                        name: action.payload.name,
                        size: action.payload.size,
                        price: action.payload.price,
                        quantity: action.payload.quantity,
                        category_id: action.payload.category_id,
                    })
                }
                cart = {
                    ...cart,
                    foods
                }
            } else {
                cart = {
                    restaurant_id: restaurant._id,
                    restaurant_name: restaurant.name,
                    foods: [
                        {
                            _id: action.payload._id,
                            name: action.payload.name,
                            size: action.payload.size,
                            price: action.payload.price,
                            quantity: action.payload.quantity,
                            category_id: action.payload.category_id,
                        }
                    ]
                }
            }
            state.cart = cart
            Cookies.set('fj-cart', cart)
        },
        loadCart (state, action) {
            let cart = Cookies.get('fj-cart') || '{}'
            state.cart = JSON.parse(cart)
        }

    },
    extraReducers: {
        [fetchRestaurants.fulfilled]: (state, action) => {
            state.restaurants.loading = false
            state.restaurants.error = action.payload.error
            state.restaurants.msg = action.payload.msg
            if(!action.payload.error) {
                state.restaurants.data = action.payload.data
            }
        },
        [fetchRestaurant.fulfilled]: (state, action) => {
            state.restaurant.loading = false
            state.restaurant.error = action.payload.error
            state.restaurant.msg = action.payload.msg
            if(!action.payload.error) {
                state.restaurant.data = action.payload.data
            }
        }
    }
}

export default reducers