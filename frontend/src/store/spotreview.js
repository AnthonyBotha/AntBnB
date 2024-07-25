const LOAD_SPOTREVIEWS = "spots/LOAD_SPOTREVIEWS";

//Actions
const loadSpotReviews = (spotReviews) => {
    return {
        type: LOAD_SPOTREVIEWS,
        payload: spotReviews
    }
}

//Thunks
export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const spotReviews = await response.json();
        dispatch(loadSpotReviews(spotReviews));
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
        default:
            return state;
    }
}

export default spotReviewReducer;

