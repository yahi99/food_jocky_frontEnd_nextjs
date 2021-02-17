import {fetchDashboardData, fetchHomepageData, fetchUser, fetchWallet} from "./actions";

const reducers = {
    reducers: {
        reloadUser( state, action ){
            state.loaded = false
        },
        logoutUser(state, action) {
            state.auth = false
            state.first_name = ""
            state.last_name = ""
            state.last_order = false
        }
    },
    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            let {error, data} = action.payload
            state.loaded = true
            if(!error) {
                state.auth = true
                state.first_name = data.first_name
                state.last_name = data.last_name
                state.mobile = data.mobile
                state.email = data.email
                let { profile_picture } = data
                if( typeof profile_picture === 'string' && profile_picture.length > 5 ) {
                    state.profile_picture = profile_picture
                }
                if(data.last_order && (data.last_order.status === 'pending' || data.last_order.status === 'accepted' || data.last_order.status === 'delivered' )) {
                    state.last_order = data.last_order
                }
            }
        },
        [fetchDashboardData.fulfilled]: (state, action) => {
            let {error, data} = action.payload
            if(!error) {
                state.dashboard = {
                    loaded: true,
                    ...data
                }
            }
        },
        [fetchWallet.fulfilled]: (state, action) => {
            let {error, data} = action.payload
            if(!error) {
                state.wallet = data
            }
        },
        [fetchHomepageData.fulfilled]: (state, action) => {
            let {error, data} = action.payload
            if(!error) {
                state.categories = data.populat_category
            }
        }
    }
}
export default reducers