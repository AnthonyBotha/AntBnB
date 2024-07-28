import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./session";
import spotReducer from "./spot";
import spotDetailReducer from "./spotdetail";
import spotReviewReducer from "./spotreview";
import spotCrudReducer from "./spotcrud";
import spotImageCrudReducer from "./spotimagecrud";


const rootReducer = combineReducers({
    session: sessionReducer,
    spot: spotReducer,
    spotDetail: spotDetailReducer,
    spotReview: spotReviewReducer,
    spotCrud: spotCrudReducer,
    spotImageCrud: spotImageCrudReducer
});

let enhancer;

if (import.meta.env.MODE === "production"){
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

