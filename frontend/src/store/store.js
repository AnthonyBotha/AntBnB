import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./session";
import spotReducer from "./spot";
import spotDetailReducer from "./spotdetail";
import spotReviewReducer from "./spotreview";
import spotCrudReducer from "./spotcrud";
import spotImageCrudReducer from "./spotimagecrud";
import reviewCrudReducer from "./spotreviewcrud";
import userReviewReducer from "./userreviewcrud";


const rootReducer = combineReducers({
    session: sessionReducer,
    spot: spotReducer,
    spotDetail: spotDetailReducer,
    spotCrud: spotCrudReducer,
    spotImageCrud: spotImageCrudReducer,
    spotReview: spotReviewReducer,
    reviewCrud: reviewCrudReducer,
    userReviewCrud: userReviewReducer
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

