import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotReviews } from "../../store/spotreview";
import { getUserReviews } from "../../store/userreviewcrud";
import { useModal } from "../../context/Modal";
import UpdateReviewFormModal from "./ReviewFormUpdate";
import DeleteReviewModal from "./ReviewDeleteModal";

import "./ReviewList.css";

const SpotReviews = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    const allSpotReviews = useSelector(state => state.spotReview);
    const allSpotReviewsArray = Object.values(allSpotReviews);
    const spotReviewsArray = allSpotReviewsArray.filter(review => review.spotId === parseInt(spotId));
    const sessionUser = useSelector(state => state.session.user); //Get the logged-in user
    const ownerId = useSelector(state => state.spotDetail[spotId].Owner.id);
    
    useEffect(() => {
        dispatch(getSpotReviews(spotId))
        dispatch(getUserReviews());
    }, [dispatch, spotId]);


    if (!allSpotReviews) {
        return
    }

    return (
        <div>
            {spotReviewsArray.map(review => (
                <div key={review.id} className="review-container">
                    <h3>{review.User.firstName}</h3>
                    <h4>{new Date(review.updatedAt).toLocaleDateString("en-US",{month: "long", year: "numeric"})}</h4>
                    <p>{review.review}</p>
                    {sessionUser && (sessionUser.id === review.userId) && (sessionUser.id !== ownerId) && (
                        <>
                            <span><button onClick={() => setModalContent(<UpdateReviewFormModal reviewId={review.id} />)}>Update</button></span>
                            <span><button onClick={() => setModalContent(<DeleteReviewModal reviewId={review.id} />)}>Delete</button></span>
                        </>
                    )}
                </div>
            ))}
        </div>

    )
}

export default SpotReviews;
