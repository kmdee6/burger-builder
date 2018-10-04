import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import ToggleButton from '../SideDrawer/ToggleButton/ToggleButton';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <ToggleButton clickToggle={props.clickToggle}/>
            <Logo height="80%"/>
            <nav className={classes.DesktopOnly}><NavigationItems/></nav>
        </header>
    );
};

export default toolbar;
