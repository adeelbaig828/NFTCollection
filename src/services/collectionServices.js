import axios from 'axios';
import { apiConfig, restrictedConfig } from '../helpers/utils';

export const collectionDetailsApi = async (id) => {
  const res = await fetch(`https://nftdepot-api.azurewebsites.net/collections/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const resKey = await res.json();
  return resKey;
};

export const followCollection = async (collectionId) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/${collectionId}/follow`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const unFollowCollection = async (collectionId) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/${collectionId}/unfollow`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const likeNfts = async (id) => {
  const res = await fetch(`https://nftdepot-api.azurewebsites.net/nft/${id}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const resKey = await res.json();
  return resKey;
};

export const unLikeNfts = async (id) => {
  const res = await fetch(`https://nftdepot-api.azurewebsites.net/nft/${id}/unlike`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const resKey = await res.json();
  return resKey;
};
export const getCollectionNft = async (id, pageNumber, searchParam, selectedFilter, traitType) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/${id}/nfts/${pageNumber}?search_query=${searchParam}&sort_by=${selectedFilter}&trait_name=${traitType}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};
export const collectionView = async (id) => {
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/collections/${id}/view`,
    apiConfig
  );
};
export const getCollectionFollowers = async (id, pageNumber) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/${id}/followers/${pageNumber}`,
    apiConfig
  );
};
export const getCollectionByCategory = async (category, pageNumber) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/category/${category}/${pageNumber}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};
export const getCollectionRarityData = async (id) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/${id}/rarity/`,
    apiConfig
  );
};
export const collectionActions = async (id, action) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/approve/${id}/${action}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const reportCollectionAPI = async (body) => {
  const { data } = await axios({
    method: 'POST',
    url: `https://nftdepot-api.azurewebsites.net/collections/report_collection`,
    data: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
  return data;
};

export const editCollectionAPI = async (collectionInfo, collectionId) => {
  const { data } = await axios({
    method: 'PATCH',
    url: `https://nftdepot-api.azurewebsites.net/collections/${collectionId}/update`,
    data: JSON.stringify(collectionInfo),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
  return data;
};
export const getCollectionTraitsFilter = async (id) => {
  return await axios.get(`https://nftdepot-api.azurewebsites.net/traits_filters/${id}`, apiConfig);
};
