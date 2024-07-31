import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserReviews } from "../../store/userreviewcrud";
import "./ReviewList.css";

const UserReviews = () => {
    const dispatch = useDispatch();

    const userReviewsArray = useSelector(state => state.userReviewCrud.Reviews);

    

    useEffect(() => {
        dispatch(getUserReviews());
    }, [dispatch])


    if (!userReviewsArray) {
        return
    }

    return (
        <div>
            {userReviewsArray.map(review => (
                <div key={review.id} className="review-container">
                    <h3>{review.Spot.name}</h3>
                    <h4>{new Date(review.updatedAt).toLocaleDateString("en-US",{month: "long", year: "numeric"})}</h4>
                    <p>{review.review}</p>
                    <span><button>Update</button></span>
                    <span><button>Delete</button></span>
                </div>
            ))}
        </div>

    )
}

export default UserReviews;