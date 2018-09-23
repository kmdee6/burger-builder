import React from 'react';
import Wrap from '../../hoc/Wrap';
import classes from './Layout.css';

const layout = (props) => {
    return (
        <Wrap>
            <div>Toolbar,Sidebar,Backdrop</div>
            <main className={classes.Layout}>{props.children}</main>
        </Wrap>
    );
};

export default layout;