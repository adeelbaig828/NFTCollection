import {
    COLLECTION_DATA_SUCCESS,
    COLLECTION_NAME_STATUS
  } from "./collectionActionTypes";
  
  export const collectionDataSuccess = (data) => {
    return {
      type: COLLECTION_DATA_SUCCESS,
      payload: data,
    };
  };
  
  export const collectionNameStatus = (data) => {
    return {
      type: COLLECTION_NAME_STATUS,
      payload: data,
    };
  };
