
const LOAD_SPOTS = "spots/LOAD_SPOTS";

//Actions
const load = (list) => {
    return {
        type: LOAD_SPOTS,
        payload: list
    } 
};

//Thunks
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch("/api/spots");

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};

const initialState = {};
//Reducer
const spotReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_SPOTS: {
            action.payload.Spots.forEach(spot => newState[spot.id] = spot);
            return newState;
        }
        default:
            return state;
    }
}

export default spotReducer;
