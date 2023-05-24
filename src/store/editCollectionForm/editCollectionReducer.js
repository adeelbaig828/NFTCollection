import {
  EDIT_COLLECTION_DATA_SUCCESS,
  EDIT_COLLECTION_NAME_STATUS,
} from "./editCollectionActionTypes";

const initialState = {
  editCollectionData: {},
  editCollectionNameStatus: "",
};

const editCollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_COLLECTION_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case EDIT_COLLECTION_NAME_STATUS:
      return { ...state, editCollectionNameStatus: action.payload };
    default:
      return state;
  }
};

export default editCollectionReducer;
