import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import collectionReducer from "./collectionForm/collectionReducer";
import editCollectionReducer from "./editCollectionForm/editCollectionReducer";
import web3Reducer from "./web3/web3Reducer";

const reducers = combineReducers({
    auth:authReducer,
    collectionData:collectionReducer,
    web3:web3Reducer,
    editCollectionData:editCollectionReducer
});
export default reducers;