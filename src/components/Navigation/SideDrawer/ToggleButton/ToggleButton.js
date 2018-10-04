import React from 'react';
import classes from './ToggleButton.css';

const toggleButton = props => {
    return (
        <div onClick={props.clickToggle} className={classes.ToggleButton}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default toggleButton;