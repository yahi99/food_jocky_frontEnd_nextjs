import {categoryRestaurants, fetchRestaurant, fetchRestaurants} from "./actions";
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
        removeFromCart(state, action) {
            let { food, cart } = action.payload
            let foods = cart.foods.map( item => {
                if( food._id === item._id ) {
                    if( food.size === item.size) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }
                }
                return item
            })
            foods = foods.filter(item => item.quantity > 0)
            cart = {
                ...cart,
                foods
            }
            if(foods.length === 0) {
                cart = {}
            }
            state.cart = cart
            Cookies.set('fj-cart', cart)
        },
        loadCart (state, action) {
            let cart = Cookies.get('fj-cart') || '{}'
            state.cart = JSON.parse(cart)
        },
        clearCart (state, action) {
            Cookies.set('fj-cart', {})
            state.cart = {}
        }
    },
    extraReducers: {
        [fetchRestaurants.fulfilled]: (state, action) => {
            state.restaurants.error = action.payload.error
            state.restaurants.msg = action.payload.msg
            let {allRestaurants, topRestaurants, nearestRestaurants, newRestaurants} = action.payload.data
            if(!action.payload.error) {
                state.restaurants.all = allRestaurants
                if( topRestaurants && topRestaurants.length > 2) {
                    state.restaurants.top = topRestaurants
                } else {
                    state.restaurants.top = []
                }
                if( nearestRestaurants && nearestRestaurants.length > 2) {
                    state.restaurants.nearest = nearestRestaurants
                } else {
                    state.restaurants.nearest = []
                }
                if( newRestaurants && newRestaurants.length > 2) {
                    state.restaurants.new = newRestaurants
                } else {
                    state.restaurants.new = []
                }
            }
            state.restaurants.loading = false
        },
        [fetchRestaurant.fulfilled]: (state, action) => {
            state.restaurant.loading = false
            state.restaurant.error = action.payload.error
            state.restaurant.msg = action.payload.msg
            if(!action.payload.error) {
                state.restaurant.data = action.payload.data
            }
        },
        [categoryRestaurants.fulfilled]: (state, action) => {
            let {error, data } = action.payload
            if(!error) {
                state.restaurants.all = data
            }
            state.restaurants.loading = false
        }

    }
}

export default reducers