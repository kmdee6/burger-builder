import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import Contact from "./Contact/Contact";

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {},
            price: 0
        }
    }

    componentDidMount() {
        const queryString = new URLSearchParams(this.props.location.search);
        console.log(queryString);
        const ingredients = {};
        let price = 0;
        for (let item of queryString.entries()) {
            // ['bacon], '1']
            console.log(queryString, item[0]);
            if (item[0] === 'price') {
                price = item[1];
            } else {
                ingredients[item[0]] = +item[1];
            }

        }
        this.setState({ingredients: ingredients, price: price});
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact');
    };

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                    ingredients={this.state.ingredients}/>
                <Route render={(props) => (
                    <Contact ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}
                       path={this.props.match.path + '/contact'}/>
            </div>
        );
    }
}

export default Checkout;