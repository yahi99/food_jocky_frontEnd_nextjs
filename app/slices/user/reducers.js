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
            }
        }
    }
}
export default reducers