import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = "/reviews/LOAD_USER_REVIEWS";

//Actions
const loadUserReviews = (userReviews) => {
    return {
        type: LOAD_USER_REVIEWS,
        payload: userReviews

    }
};

//Thunks
export const getUserReviews = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews/current");

    if (response.ok) {
        const userReviews = await response.json();
        dispatch(loadUserReviews(userReviews));
        return userReviews;
    }
};

const initialState = {};
//Reducer
const userReviewReducer = (state = initialState, action) => {

    switch(action.type) {

        case LOAD_USER_REVIEWS: {
            return action.payload;
        }
        default:
            return state;
    }
}

export default userReviewReducer;