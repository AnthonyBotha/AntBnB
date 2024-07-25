import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./SpotList.css";

const SpotList = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spot);
    const spotList = Object.values(spots);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    if (!spots) {
        return <p>Loading...</p>
    }

    //Adding a dummy spot for demonstration

    const demoSpots = [...spotList, {
        id: "dummy",
        name: "Dummy Spot One",
        city: "Los Angeles",
        state: "California",
        avgRating: 5,
        price: 300,
        previewImage: "https://res.cloudinary.com/dmg8yuivs/image/upload/v1721698719/Review_Image_1_nunyk2.jpg"
    },
    {
        id: "dummy",
        name: "Dummy Spot Two",
        city: "Boston",
        state: "Massachusetts",
        avgRating: 5,
        price: 300,
        previewImage: "https://res.cloudinary.com/dmg8yuivs/image/upload/v1721698719/Review_Image_1_nunyk2.jpg"
    }];

    return (
        <div className="spot-list">
            <div className="spot-grid">
                {demoSpots.map(spot =>  (
                    <NavLink key={spot.name} to={`/spots/${spot.id}`} >
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
                    </NavLink>
                ))}
            </div>
        </div>
    )

}

export default SpotList;