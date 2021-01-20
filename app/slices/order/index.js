import { createSlice } from '@reduxjs/toolkit'

import state from "./state";
import reducers from "./reducers";

const orderSlice = createSlice({
    name: 'order',
    initialState: state,
    ...reducers
})

//export const {reloadRestaurants} = orderSlice.actions

export default orderSlice.reducer