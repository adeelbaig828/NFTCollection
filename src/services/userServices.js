import axios from "axios";
import { apiConfig, restrictedConfig } from "../helpers/utils";

export const ChangePasswordAPI = async (userInfo) => {
  const body = {
    email: userInfo.email,
    token: userInfo?.token,
    new_password: userInfo?.new_password,
    confirm_password: userInfo?.confirm_password,
  };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/reset_password`,
    body,
    apiConfig
  );
};

export const myCollectionsAPI = async (pageNumber) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/my_collections/${pageNumber}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};
export const myCollectedNfts = async (pageNumber) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/nfts/21/collected/${pageNumber}`,
    apiConfig
  );
};

export const userDetailAPI = async (username) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/user/${username}`,
    apiConfig
  );
};

export const myFollowingCollectionsAPI = async (pageNumber) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/following/${pageNumber}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const userStatsAPI = async () => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/get_user_stats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const updateProfileAPI = async (updatedInfo) => {
  const { data } = await axios({
    method: "POST",
    url: `https://nftdepot-api.azurewebsites.net/update_user`,
    data: JSON.stringify(updatedInfo),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${window.location.origin}/`,
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
    },
  });
  return data;
};

export const updatePasswordAPI = async (updatedInfo) => {
  const { data } = await axios({
    method: "POST",
    url: `https://nftdepot-api.azurewebsites.net/update_password`,
    data: JSON.stringify(updatedInfo),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${window.location.origin}/`,
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
    },
  });
  return data;
};

export const updateQuestionsAPI = async (questionsInfo) => {
  const { data } = await axios({
    method: "POST",
    url: `https://nftdepot-api.azurewebsites.net/update_user_questions`,
    data: JSON.stringify(questionsInfo),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${window.location.origin}/`,
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
    },
  });
  return data;
};

export const getSecurityQuestionsStatusAPI = async (userId) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/get_user_q_status/${userId}`,
    apiConfig
  );
};

export const getRandomSecurityQuestionsAPI = async (userId) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/get_random_question/${userId}`,
    apiConfig
  );
};

export const verifyQuestionAPI = async (userInfo) => {
  const body = {
    ...userInfo
  };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/verify_question`,
    body,
    apiConfig
  );
};


