import { createSlice } from '@reduxjs/toolkit'

import state from "./state";
import reducers from "./reducers";

const userSlice = createSlice({
    name: 'user',
    initialState: state,
    ...reducers
})

//export const {reloadRestaurants} = userSlice.actions

export default userSlice.reducer