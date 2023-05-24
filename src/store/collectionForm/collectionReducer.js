import {
  COLLECTION_DATA_SUCCESS,
  COLLECTION_NAME_STATUS,
} from "./collectionActionTypes";

const initialState = {
  collectionData: {},
  collectionNameStatus: "",
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case COLLECTION_NAME_STATUS:
      return { ...state, collectionNameStatus: action.payload };
    default:
      return state;
  }
};

export default collectionReducer;
