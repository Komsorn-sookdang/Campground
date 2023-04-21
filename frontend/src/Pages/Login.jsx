import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, googleLogin } from "../Redux/Auth/slice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingToastId = useRef(0);
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
      return;
    }
    if (!isSuccess) {
      console.log("fail");
      toast.update(loadingToastId.current, {
        render: "Campground Login Fail: " + message,
        type: "error",
        isLoading: false,
      });
      return;
    }

    if (isSuccess && user) {
      console.log("success");
      toast.update(loadingToastId.current, {
        render: "Campground Login Success",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      navigate("/");
    }
    // dispatch(reset());
  }, [isLoading, isError, isSuccess, user, message]);

  const onSuccess = async (res) => {
    console.log("res :>> ", res);
    console.log("[Login Success] currentUser:", res.credential);
    toast.success("Success verify by Google");
    loadingToastId.current = toast.loading("Logging in Campground...");
    console.log("loadingToastId :>> ", loadingToastId.current);
    dispatch(googleLogin(res.credential));
  };

  const onFailure = (res) => {
    toast.error(res);
  };

  return (
    <Container>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </Container>
  );
};

export default LoginPage;
