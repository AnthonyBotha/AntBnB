import { csrfFetch } from "./csrf";

const ADD_SPOTIMAGE = "/spots/ADD_SPOTIMAGE";


//Actions
const addSpotImage = (image) => {
    return {
        type: ADD_SPOTIMAGE,
        payload: image
    }
};


//Thunks
export const addNewSpotImage = (payload, spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const newImage = await response.json();
        dispatch(addSpotImage(newImage));
    }
};


const initialState = {};
//Reducer
const spotImageCrudReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_SPOTIMAGE: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export default spotImageCrudReducer;