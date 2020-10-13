import React from "react";
import Register from "../src/components/register/Register";
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";

function register(props) {
    return (
        <Layout>
            <Loader/>
            <Register apiUrl={props.apiUrl} />
        </Layout>
  );
}

export async function getStaticProps(context) {
    const apiUrl = process.env.API_URL;
    return {
        props: {
            apiUrl,
        },
    };
}

export default register;
