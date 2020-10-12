import React from "react";
import LoginArea from "../src/components/Login/LoginArea";

function login(props) {
  return (
    <>
      <LoginArea apiUrl={props.apiUrl}/>
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

export default login;
