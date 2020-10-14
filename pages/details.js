import DetailsLayout from '../src/components/details/DetailsLayout'
import axios from 'axios'
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import cookie from "cookie";

function detailsLayout({restaurant,user}) {

    return (
        <Layout user={user}>
            <Loader/>
            <DetailsLayout restaurant={restaurant} user={user}/>
        </Layout>
    )
  
}

export async function getServerSideProps(context) {
  
    const url = require('url')
    const parsedUrl = url.parse(context.req.url, true)

    let user = { authenticated: false }
    if( ! ( undefined === context.req.headers.cookie ) ){
        const cookies = cookie.parse(context.req.headers.cookie);
        const token = cookies.token;
        const apiUrl = process.env.API_URL
        let postData = {
            token: token
        }
        let response = await axios.post(`${apiUrl}/api/customer/verify-token`, postData);
        let userResponse = response.data
        if( false === userResponse.error ) {
            user = {
                authenticated: true,
                name: userResponse.data.full_name
            }
        }
    }


    const domainUrl = process.env.API_URL
    let postData = {
        _id: parsedUrl.query.id
    }
    let restaurant = {}

    let response = await axios.post(`${domainUrl}/api/customer/find-one-restaurants`, postData);
  
    restaurant = response.data.data
        return {
            props: {
                restaurant,
                user
        }
    }
}

export default detailsLayout