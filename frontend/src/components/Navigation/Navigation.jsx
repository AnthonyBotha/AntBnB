import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
  
    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <div className="create-spot-container">
                    <span><NavLink to="/spots/new">Create a New Spot</NavLink></span>
                    {isLoaded && (
                        <div className="profile-container">
                            <ProfileButton user={sessionUser}/>
                        </div>
                    )}
                </div>
            </li>
   
        </ul>
    );
}

export default Navigation;