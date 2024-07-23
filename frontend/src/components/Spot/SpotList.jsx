import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import { FaStar } from "react-icons/fa";
import "./SpotList.css";

const SpotList = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spot);
    const spotList = Object.values(spots);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    return (
        <div className="spot-list">
            <div className="spot-grid">
                {spotList.map(spot =>  (
                    <div key={spot.id} className="spot-item">
                        <img src={spot.previewImage} alt={spot.city} className="spot-image"/>
                        <div className="spot-info">
                            <div className="spot-location">
                                <span> {spot.city}, {spot.state}</span>
                                <span className="spot-rating"><FaStar className="star-icon"/>{spot.avgRating}</span>
                            </div>
                            <span className="spot-price">${spot.price}</span><span>/night</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default SpotList;