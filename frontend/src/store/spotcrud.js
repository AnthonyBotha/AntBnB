// import { csrfFetch } from "./csrf";

// const CREATE_SPOT = "/spots/CREATE_SPOT";
// const UPDATE_SPOT = "/spots/UPDATE_SPOT";
// const DELETE_SPOT = "/spots/DELETE_SPOT";

// //Actions
// const createSpot = (spot) => {
//     return {
//         type: CREATE_SPOT,
//         payload: spot
//     }
// };

// const updateSpot = (spot) => {
//     return {
//         type: UPDATE_SPOT,
//         payload: spot
//     }
// };

// const deleteSpot = (spotId) => {
//     return {
//         type: DELETE_SPOT,
//         payload: spotId
//     }
// };


// //Thunks
// export const createNewSpot = (payload) => async(dispatch) => {
//     const response = await csrfFetch("/api/spots", {
//         method: "POST",
//         body: JSON.stringify(payload)
//     });

//     if (response.ok) {
//         const newSpot = await response.json();
//         dispatch(createSpot(newSpot));
//         return newSpot;
//     }
// };

// export const updateExistingSpot = (payload, spotId) => async(dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}`, {
//         method: "PUT",
//         body: JSON.stringify(payload)
//     });

//     if (response.ok) {
//         const updatedSpot = await response.json();
//         dispatch(updateSpot(updatedSpot));
//         return updatedSpot;
//     }
// };

// export const deleteExistingSpot = (spotId) => async(dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}`,{
//         method: "DELETE"
//     });

//     if (response.ok){
//         const deleteConfirmation = await response.json();
//         if (deleteConfirmation.message === "Successfully deleted"){
//             dispatch(deleteSpot(spotId));
//             return deleteConfirmation;
//         }
//     }
// };

// const initialState = {};
// //Reducer
// const spotCrudReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case CREATE_SPOT: {
//             const newState = {...state};
//             newState[action.payload.id] = action.payload;
//             return newState;
//         }
//         case UPDATE_SPOT: {
//             const newState = {...state};
//             newState[action.payload.id] = action.payload;
//             return newState;
//         }
//         case DELETE_SPOT: {
//             const newState = {...state};
//             delete newState[action.payload];
//             return newState;
//         }
//         default:
//             return state;
//     }
// }

// export default spotCrudReducer;