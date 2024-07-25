import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotDetails } from "../../store/spotdetail";
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import SpotReviews from "./SpotReview";
import "./SpotDetail.css";

const SpotDetails = () => {

    const { spotId } = useParams();
    const dispatch = useDispatch();
    
    const spotDetails = useSelector(state => state.spotDetail[spotId]);
    
    
    useEffect (() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch, spotId])

    if (!spotDetails) {
        return
    }

    const mainImage = spotDetails.SpotImages.find(image => image.preview);

    const otherImages = spotDetails.SpotImages.filter(image => !image.preview)

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
                <div className="spotDetails-text-content">
                    <h3>Hosted By {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</h3>
                    <p>{spotDetails.description}</p>
                </div>
                <div className="price-container">
                    <div className="price-rating-group">
                        <span className="price">${spotDetails.price}/night</span>
                        <div className="rating-review-group">
                            <span className="star-and-rating"><FaStar className="star-icon"/>{spotDetails.avgStarRating}</span>
                            {(spotDetails.numReviews === 1) ? (
                                <span><LuDot className="dot"/>{spotDetails.numReviews} review</span>
                            ) : (
                                <span><LuDot className="dot"/>{spotDetails.numReviews} reviews</span>
                            )}
                        </div>
                    </div>
                <button className="reserve-button" onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
                </div>
            </div>
            <div className="divider"></div>
            <div className="spotReviews-container">
                <SpotReviews />
            </div>
        </div>
    )
    
}

export default SpotDetails;
