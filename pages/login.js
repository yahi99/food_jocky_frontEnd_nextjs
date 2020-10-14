import React from "react";
import LoginArea from "../src/components/Login/LoginArea";
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";

function login(props) {
    return (
        <Layout>
            <Loader/>
            <LoginArea apiUrl={props.apiUrl}/>
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

export default login;
