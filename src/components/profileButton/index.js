import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileIcon from "../../assets/icons/profileIcon";
import Menu from "../menu";
import MenuItem from "../menu/menuItem";
import './style.css';

const ProfileButton = ({ initials, id }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <div className="profile-circle" id={id} onClick={() => setIsMenuVisible(!isMenuVisible)}>
      {isMenuVisible && <CascadingMenu id={id} />}
      <NavLink to={`/profile/${id}`}>
      <div className="profile-icon">
        <p>{initials}</p>
      </div>
      </NavLink>
    </div>
  );
};

const CascadingMenu = ({ id }) => {
  return (
    <Menu className="profile-circle-menu">
      {console.log('user id', id)}
      <NavLink to={`/profile/${id}`}>
        <MenuItem icon={<ProfileIcon />} text='Profile' />
      </NavLink>
    </Menu>
  );
};

export default ProfileButton;