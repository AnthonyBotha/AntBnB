import { csrfFetch } from "./csrf";

const LOAD_SPOTDETAILS = "/spots/LOAD_SPOTDETAILS";

//Actions
const loadSpotDetails = (spotdetails) => {
    return {
        type: LOAD_SPOTDETAILS,
        payload: spotdetails
    }
};

//Thunks
export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spotDetails = await response.json();
        dispatch(loadSpotDetails(spotDetails));
        return spotDetails;
    }
};

const initialState = {};
//Reducer
const spotDetailReducer = (state = initialState, action) => {

    switch(action.type) {

        case LOAD_SPOTDETAILS: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export default spotDetailReducer;