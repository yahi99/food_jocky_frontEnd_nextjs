import React from "react";
import Register from "../src/components/register/Register";

function register(props) {
  return (
    <>
      <Register apiUrl={props.apiUrl} />
    </>
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
