import React, {Component} from "react";
import Wrap from "../../../hoc/Wrap/Wrap";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    //This could be a functional component since no lifecycle manipulation is intended.
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return (
                <li key={key}>
        <span style={{textTransform: "capitalize", marginRight: "20px"}}>
          {key}:
        </span>
                    {this.props.ingredients[key]}
                </li>
            );
        });

        return (
            <Wrap>
                <h3>Order Summary</h3>
                <p>Your juicy order is ready!! Here's the Order Summary:</p>
                <ul>{ingredientSummary}</ul>
                <p>
                    <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
                </p>
                <p>Continue to Checkout?</p>
                <Button buttonType="Danger" clicked={this.props.cancelBtn}>
                    CANCEL
                </Button>
                <Button buttonType="Success" clicked={this.props.continueBtn}>
                    CONTINUE
                </Button>
            </Wrap>
        );
    }
}

export default OrderSummary;
