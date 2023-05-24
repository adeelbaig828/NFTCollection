import axios from 'axios';
import { apiConfig } from '../helpers/utils';

export const nftDetailsApi = async (id) => {
  const res = await fetch(`https://nftdepot-api.azurewebsites.net/nfts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const resKey = await res.json();
  return resKey;
};

export const editNfAPI = async (nftInfo, nftId) => {
  console.log('editNfAPI nftInfo', nftInfo);
  console.log('editNfAPI nftId', nftId);
  const { data } = await axios({
    method: 'POST',
    url: `https://nftdepot-api.azurewebsites.net/nfts/${nftId}/edit`,
    data: JSON.stringify(nftInfo),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
  console.log('editNfAPI success');
  return data;
};

export const deleteNftApi = async (nftId) => {
  console.log('deleteNftApi nftId', nftId);
  const res = await axios({
    method: 'DELETE',
    url: `https://nftdepot-api.azurewebsites.net/nfts/${nftId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
  console.log('deleteNftApi success');
  return res;
};
