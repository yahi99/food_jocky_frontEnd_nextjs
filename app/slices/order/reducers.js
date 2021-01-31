import {fetchDeliveryAddresses, fetchDeliveryAmount, fetchOrder} from "./actions";

const reducers = {
    reducers: {

    },
    extraReducers: {
        [fetchDeliveryAmount.fulfilled]: (state, action) => {
            let { error, data } = action.payload
            if(!error) {
                state.delivery_charge = data.delivery_charge
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