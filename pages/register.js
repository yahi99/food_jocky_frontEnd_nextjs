import React from "react";
import Register from "../src/components/register/Register";
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import {isUser} from "../src/components/auth";

function register(props) {
    return (
        <Layout>
            <Loader/>
            <Register apiUrl={props.apiUrl} />
        </Layout>
  );
}

export async function getServerSideProps(context) {
    const apiUrl = process.env.API_URL;
    let user = await isUser(context);
    if(user.authenticated) {
        context.res.writeHeader(307, { Location: "/" });
        context.res.end()
    }

    return {
        props: {
            apiUrl,
        },
    };
}

export default register;
