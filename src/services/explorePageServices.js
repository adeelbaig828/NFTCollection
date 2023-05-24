import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const allCollectionsAPI = async (pageNumber) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/all/${pageNumber}`,
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
