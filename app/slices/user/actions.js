import {createAsyncThunk} from "@reduxjs/toolkit";
import {UrqlClient} from "../../../src/components/urql/urql-provider";
import Cookies from 'js-cookie'

export const fetchUser = createAsyncThunk('user/fetch', async ({}) => {
    let token = Cookies.get('token')
    let query = `
            query($token: String!){
                verifyCustomerToken(token: $token) {
                    error
                    msg
                    data {
                        first_name
                        last_name
                        last_order {
                            _id
                            status
                        }
                    }
                }
            }
        `
    let client = UrqlClient();
    let response = await client.query(query, {token}).toPromise();
})

export const userLogin = createAsyncThunk('user/login', async () => {

})