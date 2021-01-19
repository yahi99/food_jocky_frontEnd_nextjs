import {fetchRestaurants} from "./actions";

const reducers = {
    reducers: {
        reloadRestaurants(state, action) {
            state.restaurants.loading = true
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
        }
    }
}

export default reducers