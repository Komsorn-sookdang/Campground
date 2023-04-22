import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0 25px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 10px;
  &:hover {
    cursor: pointer;
    border-bottom: 4px solid black;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const Logo = styled.p`
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
`;

const NavBar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <Container hidden={show}>
      <Logo>CAMPGROUND</Logo>
      <Options>
        <Option>Home</Option>
        <Option>Blog</Option>
        <Option>Projects</Option>
        <Option>About</Option>
      </Options>
      <Profile>
        <Option>Register</Option>
        <Option>Login</Option>
      </Profile>
    </Container>
  );
};

export default NavBar;
