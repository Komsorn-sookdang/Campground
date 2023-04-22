import styled from "styled-components";
import NavBar from "../Component/NavBar";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  background-color: #f5f5f5;
`;

const ImageTitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  hight: auto;
  z-index: 0;
`;

const BGImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
`;

const FateOut = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Body>
        <ImageTitle>
          <BGImage src={require("../Asset/home-bg.jpg")} alt="" />
          <FateOut />
        </ImageTitle>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
        <p>1234</p>
      </Body>
    </>
  );
};

export default HomePage;
