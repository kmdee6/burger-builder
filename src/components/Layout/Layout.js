import React from "react";
import Wrap from "../../hoc/Wrap";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = props => {
  return (
    <Wrap>
      <Toolbar />
      <div>Sidebar,Backdrop</div>
      <main className={classes.Layout}>{props.children}</main>
    </Wrap>
  );
};

export default layout;
