import {fetchDeliveryAddresses, fetchDeliveryAmount} from "./actions";

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
        }
    }
}

export default reducers