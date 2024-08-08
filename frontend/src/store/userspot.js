// import { csrfFetch } from "./csrf";

// const LOAD_USER_SPOTS = "/spots/LOAD_USER_SPOTS";

// //Actions
// const loadUserSpots = (list) => {
//     return {
//         type: LOAD_USER_SPOTS,
//         payload: list
//     }
// };

// //Thunks
// export const getUserSpots = () => async (dispatch) => {
//     const response = await csrfFetch("/api/spots/current");

//     if (response.ok) {
//         const userList = await response.json();
//         dispatch(loadUserSpots(userList));
//     }
// };

// const initialState = {};
// //Reducer
// const userSpotReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case LOAD_USER_SPOTS: {
//             const newState = {...state};
//             action.payload.Spots.forEach(spot => newState[spot.id] = spot);
//             return newState;
//         }
//         default:
//             return state;
//     }
// }

// export default userSpotReducer;