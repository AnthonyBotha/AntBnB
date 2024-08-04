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


    return (
        <div className="spot-list">
            <div className="spot-grid">
                {spotList.map(spot =>  (
                    <NavLink key={spot.id+spot.name} to={`/spots/${spot.id}`} >
                        <div key={spot.id} className="spot-item">
                            <div className="spot-tooltip">{spot.name}</div>
                            <img src={spot.previewImage} alt={spot.city} className="spot-image"/>
                            <div className="spot-info">
                                <div className="spot-location">
                                    <span> {spot.city}, {spot.state}</span>
                                    <span className="star-and-rating"><FaStar className="star-icon"/>{(spot.avgRating === 0)?("New"):(spot.avgRating)}</span>
                                </div>
                                <span className="spot-price">${spot.price}</span><span>/night</span>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className="about-section">
                <div className="about-section-one">
                     <h4>© 2024 AntBnB,Inc.</h4>
                </div>
                <div className="about-section-two">
                    <h4>Terms · SitemapPrivacy · Your Privacy Choices</h4>
                </div>
                <div className="about-section-three">
                    <span><h4>Anthony Botha</h4></span>
                    <span>
                        <NavLink to="https://www.linkedin.com/in/anthony-botha-65b1a54b/">
                            <img src="https://res.cloudinary.com/dmg8yuivs/image/upload/v1722731641/LinkedIn_pyeprg.png" alt="Linkedin-Logo"/>
                        </NavLink>
                    </span>
                </div>
            </div>
        </div>
    )

}

export default SpotList;