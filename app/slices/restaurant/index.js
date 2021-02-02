import { createSlice } from '@reduxjs/toolkit'

import state from "./state";
import reducers from "./reducers";

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: state,
    ...reducers
})

export const {reloadRestaurants, loadCart, addToCart, removeFromCart, clearCart} = restaurantSlice.actions

export default restaurantSlice.reducer