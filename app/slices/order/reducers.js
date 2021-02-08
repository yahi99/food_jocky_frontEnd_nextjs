import {fetchDeliveryAddresses, fetchOrder, fetchSettings} from "./actions";

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
        }
    }
}

export default reducers