import {
    EDIT_COLLECTION_DATA_SUCCESS,
    EDIT_COLLECTION_NAME_STATUS
  } from "./editCollectionActionTypes";
  
  export const editCollectionDataSuccess = (data) => {
    return {
      type: EDIT_COLLECTION_DATA_SUCCESS,
      payload: data,
    };
  };
  
  export const editCollectionNameStatus = (data) => {
    return {
      type: EDIT_COLLECTION_NAME_STATUS,
      payload: data,
    };
  };
