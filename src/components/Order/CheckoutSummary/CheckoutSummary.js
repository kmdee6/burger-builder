import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../../components/UI/Button/Button'
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {

    /*cancelCheckoutHandler = () => {
        console.log('Cancel checkout');
    };

    continueCheckoutHandler = () => {
        console.log('Continue Checkout');
    };*/

    return (
        <div className={classes.CheckoutSummary}>
            <h2>Hey, is this your Burger??</h2>
            <div style={{margin: 'auto', width: '100%'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                clicked={props.checkoutCancel}
                buttonType="Danger">CANCEL</Button>
            <Button
                clicked={props.checkoutContinue}
                buttonType="Success">CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;