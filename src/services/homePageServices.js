import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const getTopHitsAPI = async () => {
    return await axios.get(
      `https://nftdepot-api.azurewebsites.net/collections/top_hits`,
      apiConfig
    );
  };

export const getFeaturedAPI = async () => {
    return await axios.get(
      `https://nftdepot-api.azurewebsites.net/collections/featured_collections`,
      apiConfig
    );
  };

  