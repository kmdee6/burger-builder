import React from "react";
import classes from "./Backdrop.css";

const backdrop = props => {
  return props.show ? (
    <div onClick={props.closeModal} className={classes.Backdrop} />
  ) : null;
};

export default backdrop;
