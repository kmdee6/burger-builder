import React, {Component} from "react";
import Wrap from "../Wrap/Wrap";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    collapseSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    };

    toggleSideDrawerHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    render() {
        return (<Wrap>
            <Toolbar clickToggle={this.toggleSideDrawerHandler}/>
            <SideDrawer showDrawer={this.state.showSideDrawer} closeDrawer={this.collapseSideDrawerHandler}/>
            <div>Backdrop</div>
            <main className={classes.Layout}>{this.props.children}</main>
        </Wrap>);
    }
}

export default Layout;
