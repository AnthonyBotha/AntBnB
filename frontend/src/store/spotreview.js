import { csrfFetch } from "./csrf";

const LOAD_SPOTREVIEWS = "/spots/LOAD_SPOTREVIEWS";
// const LOAD_SPOTREVIEWS_ERROR = "spots/LOAD_SPOTREVIEW_ERROR";

//Actions
const loadSpotReviews = (spotReviews) => {
    return {
        type: LOAD_SPOTREVIEWS,
        payload: spotReviews
    }
}

// const loadSpotReviewsError = (spotId) => {
//     return {
//         type: LOAD_SPOTREVIEWS_ERROR,
//         payload: spotId
//     }
// }

//Thunks
export const getSpotReviews = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    
        if (response.ok) {
            const spotReviews = await response.json();
            dispatch(loadSpotReviews(spotReviews));
        } 
    } catch (e) {
        return;
        // dispatch(loadSpotReviewsError(spotId));
    }
};

const initialState = {};

//Reducer
const spotReviewReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_SPOTREVIEWS: {
            const newState = {...state};
            action.payload.Reviews.forEach(review => newState[review.id] = review);
            return newState;
        }
        // case LOAD_SPOTREVIEWS_ERROR: {
        //     const newState = {...state};
        //     newState[action.payload] = {};
        //     return newState;
        // }
        default:
            return state;
    }
}

export default spotReviewReducer;

