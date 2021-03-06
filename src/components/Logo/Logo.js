import React from "react";
import logoImage from "../../assets/images/burger-logo.png";
import classes from "./Logo.css";

const logo = props => {
    return (
        <div className={classes.Logo} style={{height: props.height, marginBottom: props.marginBottom}}>
            <img src={logoImage} alt="BurgerLogo"/>
        </div>
    );
};

export default logo;
