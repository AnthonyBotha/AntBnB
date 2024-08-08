// import { csrfFetch } from "./csrf";

// const CREATE_REVIEW = "/reviews/CREATE_REVIEW";
// const UPDATE_REVIEW = "/reviews/UPDATE_REVIEW";

// //Actions
// const createReview = (review) => {
//     return {
//         type: CREATE_REVIEW,
//         payload: review
//     }
// };

// const updateReview = (review) => {
//     return {
//         type: UPDATE_REVIEW,
//         payload: review
//     }
// };

// //Thunks
// export const createNewReview = (spotId, reviewBody) => async(dispatch) => {
//         const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//             method: "POST",
//             body: JSON.stringify(reviewBody)
//         });
    
//         if (response.ok){
//             const newReview = await response.json();
//             dispatch(createReview(newReview));
//             return newReview;
//         } 
// }

// export const updateExistingReview = (reviewId, reviewBody) => async(dispatch) => {
//     const response = await csrfFetch(`/api/reviews/${reviewId}`,{
//         method: "PUT",
//         body: JSON.stringify(reviewBody)
//     });

//     if (response.ok) {
//         const updatedReview = await response.json();
//         dispatch(updateReview(updatedReview));
//         return updatedReview;
//     }
// }



// const initialState = {};
// //Reducer
// const reviewCrudReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case CREATE_REVIEW: {
//             const newState = {...state};
//             newState[action.payload.id] = action.payload;
//             return newState;
//         }
//         case UPDATE_REVIEW: {
//             const newState = {...state};
//             newState[action.payload.id] = action.payload;
//             return newState;
//         }

//         default:
//             return state;
//     }
// }

// export default reviewCrudReducer;

