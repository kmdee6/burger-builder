import React, { Component } from "react";
import Wrap from "../../hoc/Wrap";
import Burger from "../../components/Burger/Burger";
import CommandCenter from "../../components/Burger/CommandCenter/CommandCenter";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 1,
        cheese: 1,
        meat: 1,
        bacon: 2
      }
    };
  }
  render() {
    return (
      <Wrap>
        <Burger ingredients={this.state.ingredients} />
        <CommandCenter />
      </Wrap>
    );
  }
}

export default BurgerBuilder;
