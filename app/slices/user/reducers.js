import {fetchUser} from "./actions";

const reducers = {
    reducers: {
        reloadUser( state, action ){
            state.loaded = false
        },
        logoutUser(state, action) {
            state.auth = false
            state.first_name = ""
            state.last_name = ""
        }
    },
    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            state.loaded = true
            if(!action.payload.error) {
                state.auth = true
                state.first_name = action.payload.data.first_name
                state.last_name = action.payload.data.last_name
            }
        }
    }
}
export default reducers