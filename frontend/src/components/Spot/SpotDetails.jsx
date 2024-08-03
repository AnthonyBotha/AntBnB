import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotDetails } from "../../store/spotdetail";
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { useModal } from "../../context/Modal";
import SpotReviews from "../Review/ReviewList";
import ReviewFormModal from "../Review/ReviewForm";
import "./SpotDetail.css";
import { getSpotReviews } from "../../store/spotreview";
import { restoreUser } from "../../store/session";

const SpotDetails = () => {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const { setModalContent } = useModal();
    
    const spotDetails = useSelector(state => state.spotDetail[spotId]);
    const sessionUser = useSelector(state => state.session.user); //Get the logged-in user
    const spotReviews = useSelector(state => state.spotReview);
    const spotReviewsArray = Object.values(spotReviews);

    const [userHasPostedReview, setUserHasPostedReview] = useState(false);
    
    
    
    useEffect (() => {
        dispatch(getSpotDetails(spotId));
        dispatch(getSpotReviews(spotId));
        dispatch(restoreUser());
    }, [dispatch, spotId]);

    useEffect(() => {
        if (spotReviews && sessionUser) {
            const userReview = spotReviewsArray.find(review => review.userId === sessionUser.id);
            setUserHasPostedReview(!!userReview);
        } else {
            setUserHasPostedReview(false);
        }
        
    },[spotId, spotReviews, spotReviewsArray, sessionUser])

    if (!spotDetails || !spotReviews){
        return;
    }
    
    const mainImage = spotDetails.SpotImages.find(image => image.preview);
    
    const otherImages = spotDetails.SpotImages.filter(image => !image.preview);
    
    //Check if the logged-in user has already posted a review
    console.log("Session User:", userHasPostedReview);

    return (
        <div className="spotDetails-page-layout">
            <div className="spotDetails-container">
                <h1>{spotDetails.name}</h1>
                <h4>{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h4>
                <div className="spotDetails-content">
                    <div className="spotDetails-main-image-container">
                        <img
                            src={mainImage ? mainImage.url : ""}
                            alt="Main Spot"
                            className="spotDetails-main-image"
                        />
                    </div>
                    <div className="spotDetails-images-grid">
                        {otherImages.map(image => (
                            <img key={image.id} src={image.url} alt={`Spot Image ${image.id}`}/>
                        ))}
                    </div>
                </div>
                <div className="spotDetails-text-price-wrapper">

                    <div className="spotDetails-text-content">
                        <h3>Hosted By {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</h3>
                        <p>{spotDetails.description}</p>
                    </div>
                    <div className="price-container">
                        <div className="price-rating-group">
                            <span className="price">${spotDetails.price}/night</span>
                            <div className="rating-review-group">
                                <span className="star-and-rating"><FaStar className="star-icon"/>{(spotDetails.avgStarRating === 0)?("New"):(spotDetails.avgStarRating)}</span>
                                {spotDetails.numReviews === 1 && <span><LuDot className="dot"/>{spotDetails.numReviews} review</span>}
                                {spotDetails.numReviews > 1 && <span><LuDot className="dot"/>{spotDetails.numReviews} reviews</span>}
                            </div>
                        </div>
                        <button className="reserve-button" onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="spotReviews-container">
            <span className="star-and-rating"><FaStar className="star-icon"/>{(spotDetails.avgStarRating === 0)?("New"):(spotDetails.avgStarRating)}</span>
                            {spotDetails.numReviews === 1 && <span><LuDot className="dot"/>{spotDetails.numReviews} review</span>}
                            {spotDetails.numReviews > 1 && <span><LuDot className="dot"/>{spotDetails.numReviews} reviews</span>}
                <div>
                    {sessionUser && (sessionUser.id !== spotDetails.ownerId) && !userHasPostedReview && (
                        <button onClick={() => setModalContent(<ReviewFormModal spotId={spotDetails.id}/>)}>Post Your Review</button>
                    )}
                    {sessionUser && (sessionUser.id !== spotDetails.ownerId) && !userHasPostedReview && (spotDetails.avgStarRating === 0) && (
                        <h4>Be the first to post a review!</h4>
                    )}
                </div>
                <SpotReviews />
            </div>
        </div>
    )
    
}

export default SpotDetails;
