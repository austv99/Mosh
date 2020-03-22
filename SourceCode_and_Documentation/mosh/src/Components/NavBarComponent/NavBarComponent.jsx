import React from 'react';
import "./NavBarComponent.css"
import Profile from "../../icons/person-circle-outline.svg"



export const NavBarComponent = (props) => {
  return (
    <div  className="app__bar">
        <h2>Mosh</h2>
        <img src={Profile} alt="" className="prof"/>
    </div>

  );

}

export default NavBarComponent;