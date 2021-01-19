import { configureStore } from '@reduxjs/toolkit'
import restaurantsReducer from './slices/restaurant'
import userReducer from './slices/user'


export default configureStore({
    reducer: {
        restaurant: restaurantsReducer,
        user: userReducer,
    }
})