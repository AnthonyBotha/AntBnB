import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotReviews } from "../../store/spotreview";
import "./SpotReview.css";

const SpotReviews = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spotReviews = useSelector(state => state.spotReview);
    const spotReviewsArray = Object.values(spotReviews);

    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch, spotId])


    if (!spotReviews) {
        return
    }

    return (
        <div>
            {spotReviewsArray.map(review => (
                <div key={review.id} className="review-container">
                    <h3>{review.User.firstName}</h3>
                    <h4>{new Date(review.updatedAt).toLocaleDateString("en-US",{month: "long", year: "numeric"})}</h4>
                    <p>{review.review}</p>
                </div>
            ))}
        </div>

    )
}

export default SpotReviews;
