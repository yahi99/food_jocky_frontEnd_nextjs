import React from "react";
import LoginArea from "../src/components/Login/LoginArea";
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";

function login(props) {
    return (
        <Layout>
            <Loader/>
            <LoginArea apiUrl={props.apiUrl} referer/>
        </Layout>
  );
}

export async function getServerSideProps(context) {
    console.log(context.req.headers.referer)

    const apiUrl = process.env.API_URL;
    return {
        props: {
            apiUrl,
            referer: context.req.headers.referer,
        },
    };
}

export default login;
