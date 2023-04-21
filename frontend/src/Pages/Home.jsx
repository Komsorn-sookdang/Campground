import styled from "styled-components";
import { gapi } from "gapi-script";
import { useEffect } from "react";

const HomePage = () => {
  const clientId =
    "483816555687-l4opuns0drglkh1rfg4nrh8esvvci09b.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res);
  };

  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };

  return (
    <div>
      <p>Home Page</p>
    </div>
  );
};

export default HomePage;
