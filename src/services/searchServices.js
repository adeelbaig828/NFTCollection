import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const AdvanceSearchApi = async (query, category, pageNumber) => {
  const res = category
    ? await fetch(
        `https://nftdepot-api.azurewebsites.net/collections/advanced_search?page=${pageNumber}&query=${query}&category=${category}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
    : await fetch(
        `https://nftdepot-api.azurewebsites.net/collections/advanced_search?page=${pageNumber}&query=${query}`,
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

export const searchApi = async (query) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/search?query=${query}`,
    apiConfig
  );
};
