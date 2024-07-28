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
                <NavLink to="/spots/new">Create a New Spot</NavLink>
            </li>
            {isLoaded && (
                <div className="profile-container">
                    <ProfileButton user={sessionUser}/>
                </div>
              
            )}
        </ul>
    );
}

export default Navigation;