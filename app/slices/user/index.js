import { createSlice } from '@reduxjs/toolkit'

import state from "./state";
import reducers from "./reducers";

export const userSlice = createSlice({
    name: 'user',
    initialState: state,
    ...reducers
})

export const {reloadUser, logoutUser} = userSlice.actions

export default userSlice.reducer