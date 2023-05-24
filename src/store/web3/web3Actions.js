import {
  WALLET_CONNECTION_SUCCESS,
  WALLET_CONNECTION_FAILURE,
  } from "./web3ActionTypes";
  
  export const walletConnectionSuccess = (data) => {
    return {
      type: WALLET_CONNECTION_SUCCESS,
      payload: data,
    };
  };

  export const walletConnectionFailure = (data) => {
    return {
      type: WALLET_CONNECTION_FAILURE,
      payload: data,
    };
  }
  
