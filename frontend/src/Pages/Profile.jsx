import React from "react";
import styled from "styled-components";
import NavBar from "../Component/NavBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const JWTtext = styled.p`
  width: 50%;
  color: #000;
  line-break: anywhere;
`;

const ProfilePage = () => {
  return (
    <>
      <NavBar />
      <Container>
        <h3>Your JWT is:</h3>
        <JWTtext>{localStorage.getItem("JWTtoken") ?? "doesn't login"}</JWTtext>
      </Container>
    </>
  );
};

export default ProfilePage;
