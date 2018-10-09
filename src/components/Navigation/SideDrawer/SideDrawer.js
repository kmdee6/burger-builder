import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from '../../UI/Backdrop/Backdrop';
import Wrap from '../../../hoc/Wrap/Wrap';

const sideDrawer = props => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Close];
    if (props.showDrawer) {
        sideDrawerClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Wrap>
            <Backdrop close={props.closeDrawer} show={props.showDrawer}/>
            <div className={sideDrawerClasses.join(' ')}>
                <Logo height="11%" marginBottom="32px"/>
                <nav><NavigationItems/></nav>
            </div>
        </Wrap>
    );
};

export default sideDrawer;