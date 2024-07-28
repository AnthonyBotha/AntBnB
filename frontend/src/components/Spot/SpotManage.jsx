import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import { FaStar } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./SpotList.css";

const SpotManage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const spots = useSelector(state => state.spot);
    const spotList = Object.values(spots);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    if (!spots) {
        return <p>Loading...</p>
    }


    return (
        <div className="spot-list">
            <h1>Manage Your Spots</h1>
            <button onClick={() => navigate("/spots/new")}>Create a New Spot</button>
            <div className="spot-grid">
                {spotList.map(spot =>  (
                    <div>
                        <div key={spot.id} className="spot-item">
                            <div className="spot-tooltip">{spot.name}</div>
                            <img src={spot.previewImage} alt={spot.city} className="spot-image"/>
                            <div className="spot-info">
                                <div className="spot-location">
                                    <span> {spot.city}, {spot.state}</span>
                                    <span className="spot-rating"><FaStar className="star-icon"/>{spot.avgRating}</span>
                                </div>
                                <span className="spot-price">${spot.price}</span><span>/night</span>
                            </div>
                        </div>
                        <span><button onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button></span>
                        <span><button>Delete</button></span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default SpotManage;