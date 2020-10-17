import React from 'react'
import NewRestaurantForm from "../src/components/NewRestaurant/NewRestaurantForm";
import Layout from "../src/components/layouts/main";
import Loader from "../src/components/Common/Loader";
import axios from "axios";

function AddRestaurant({categories, apiUrl}) {
    return (
        <Layout>
            <Loader/>
            <section className="customer_food_add">
                <div className="container">
                    <NewRestaurantForm categories={categories} apiUrl={apiUrl}/>
                </div>
            </section>
           
        </Layout>
    )
}


export async function getServerSideProps(context) {

    const apiUrl = process.env.API_URL;
    let response = await axios.post(`${apiUrl}/api/admin/category-get-all`, {});
    let categories = response.data.data || [] ;

    return {
        props: {
            categories,
            apiUrl
        }
    }


}


export default AddRestaurant