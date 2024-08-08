// import { csrfFetch } from "./csrf";

// const LOAD_USER_REVIEWS = "/reviews/LOAD_USER_REVIEWS";
// const DELETE_REVIEW = "/reviews/DELETE_REVIEW";

// //Actions
// const loadUserReviews = (userReviews) => {
//     return {
//         type: LOAD_USER_REVIEWS,
//         payload: userReviews
//     }
// };

// const deleteReview = (reviewId) => {
//     return {
//         type: DELETE_REVIEW,
//         payload: reviewId
//     }
// };

// //Thunks
// export const getUserReviews = () => async (dispatch) => {
//     const response = await csrfFetch("/api/reviews/current");

//     if (response.ok) {
//         const userReviews = await response.json();
//         dispatch(loadUserReviews(userReviews));
//         return userReviews;
//     }
// };

// export const deleteExistingReview = (reviewId) => async(dispatch) => {
//     const response = await csrfFetch(`/api/reviews/${reviewId}`,{
//         method: "DELETE"
//     });

//     if (response.ok){
//         const deleteConfirmation = await response.json();
//         if (deleteConfirmation.message === "Successfully deleted"){
//             dispatch(deleteReview(reviewId));
//             return deleteConfirmation;
//         }
//     }
// };

// const initialState = {};
// //Reducer
// const userReviewReducer = (state = initialState, action) => {

//     switch(action.type) {

//         case LOAD_USER_REVIEWS: {
//             const newState = {...state};
//             action.payload.Reviews.forEach(review => newState[review.id] = review);
//             return newState;
//         }
//         case DELETE_REVIEW: {
//             const newState = {...state};
//             delete newState[action.payload];
//             return newState;
//         }
//         default:
//             return state;
//     }
// }

// export default userReviewReducer;