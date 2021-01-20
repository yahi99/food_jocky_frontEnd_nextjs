import { configureStore } from '@reduxjs/toolkit'
import restaurantsReducer from './slices/restaurant'
import userReducer from './slices/user'
import orderReducer from './slices/order'


export default configureStore({
    reducer: {
        restaurant: restaurantsReducer,
        user: userReducer,
        order: orderReducer
    }
})