import { csrfFetch } from "./csrf";

const CREATE_SPOT = "/spots/CREATE_SPOT";
const UPDATE_SPOT = "/spots/UPDATE_SPOT";

//Actions
const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    }
};

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
};


//Thunks
export const createNewSpot = (payload) => async(dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot));
        return newSpot;
    }
};

export const updateExistingSpot = (payload, spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
};

const initialState = {};
//Reducer
const spotCrudReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_SPOT: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
        }
        default:
            return state;
    }
}

export default spotCrudReducer;