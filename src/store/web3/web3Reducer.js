import {
    WALLET_CONNECTION_SUCCESS,
    WALLET_CONNECTION_FAILURE,
} from "./web3ActionTypes";

const initialState = {
    wallet: null,
    library: null,
    provider: null,
    connected: false,
};

const web3Reducer = (state = initialState, action) => {
    switch (action.type) {
        case WALLET_CONNECTION_SUCCESS:
            return { ...state, wallet: action.payload?.account, provider:action.payload?.provider, library: action.payload?.library, signer: action.payload?.signer, connected: true };
        case WALLET_CONNECTION_FAILURE:
            return { ...state, wallet: null, provider:null, library: null, connected: false };
        default:
            return state;
    }
};

export default web3Reducer;
