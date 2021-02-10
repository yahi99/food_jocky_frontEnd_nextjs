import {fetchDeliveryAddresses, fetchOrder, fetchSettings, getDistance} from "./actions";

const reducers = {
    reducers: {

    },
    extraReducers: {
        [fetchSettings.fulfilled]: (state, action) => {
            let { error, data } = action.payload
            if(!error) {
                state.settings = data
                state.settings.loaded = true
            }
        },
        [fetchDeliveryAddresses.fulfilled]: (state, action) => {
            let { error, data } = action.payload
            if(!error) {
                state.delivery_locations = data
            }
        },
        [fetchOrder.fulfilled]: (state, action) => {
            let { error, data } = action.payload
            state.loaded = !error
            state.data = data
        },
        [getDistance.fulfilled]: (state, action) => {
            let { error, data } = action.payload
            if(!error) {
                state.distance = Math.max(1, data.distance )
            }
        }
    }
}

export default reducers