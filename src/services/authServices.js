import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const SignUpAPI = async (userInfo) => {
  const body = {
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    password: userInfo.password,
    confirm_password: userInfo.confirm_password,
    wallet_id: userInfo.wallet_id,
    email: userInfo.email,
    notification_marketing:userInfo.notification_marketing,
    username:userInfo?.username
  };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/signup`,
    body,
    apiConfig
  );
};

export const LoginAPI = async (userInfo) => {
  const body = {
    password: userInfo.password,
    email: userInfo.email,
  };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/login`,
    body,
    apiConfig
  );
};

export const ForgotPasswordAPI = async (userInfo) => {
  const body = {
    email: userInfo.email,
  };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/reset_password_request`,
    body,
    apiConfig
  );
};

export const VerifyUserEmailAPI = async (token) => {
  const body = {
    token: token,
  };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/verify_email/`,
    body,
    apiConfig
  );
};

export const ResendUserEmailAPI = async (email) => {
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/resend_verification_email/?email=${email}`,
    apiConfig
  );
};

export const VerifyUserAPI = async () => {
  return await axios({
    method: "GET",
    url: `https://nftdepot-api.azurewebsites.net/me`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": `${window.location.origin}/`,
      "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
    },
  });
};

export const VerifyEmailAPI = async (email) => {
  return await axios({
    method: "POST",
    url: `https://nftdepot-api.azurewebsites.net/check_email/?email=${email}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${window.location.origin}/`,
      "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
    },
  });
};

export const VerifyUsernameAPI = async (username) => {
  return await axios({
    method: "POST",
    url: `https://nftdepot-api.azurewebsites.net/check_username/?username=${username}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${window.location.origin}/`,
      "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
    },
  });
};


export const VerifyUser = async () => {
  try {
    const { data } = await VerifyUserAPI();
    return data?.body;
  } catch (err) {
    return err;
  }
};
