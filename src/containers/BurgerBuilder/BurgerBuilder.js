import React, {Component} from "react";
import Wrap from "../../hoc/Wrap/Wrap";
import Burger from "../../components/Burger/Burger";
import CommandCenter from "../../components/Burger/CommandCenter/CommandCenter";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: true,
            error: false
        };
    }

    componentWillMount() {
        axios.get('https://react-burger-64656.firebaseio.com/prices.json')
            .then(response => {
                this.props.onPricesFetched(response.data)
                this.setState({loading: false});
            }).catch(error => this.setState({loading: false, error: true}))
    }

    updatePurchaseState = () => {
        const ingredientCount = Object.keys(this.props.ingProps)
            .map(ingredient => {
                return this.props.ingProps[ingredient];
            })
            .reduce((ingredientCount, element) => {
                return ingredientCount + element;
            });
        return ingredientCount > 0;
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    };

    continuePurchaseHandler = () => {
        /*const queryParams = [];
        for (let i in this.props.ingProps) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingProps[i]));
        }
        queryParams.push('price=' + encodeURIComponent(this.props.totalPrice));
        const queryString = queryParams.join('&');*/
        this.props.history.push({
            pathname: '/checkout'
            /*,
            search: '?' + queryString*/
        });
    };

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-burger-64656.firebaseio.com/ingredients.json')
            .then(response => {
                this.props.updateIngredients(response.data);
                this.updatePurchaseState(response.data);
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    render() {
        let disabledInfo = {...this.props.ingProps};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Unable to fetch ingredients.</p> : <Spinner/>;

        if (this.props.ingProps) {
            burger = <Wrap><Burger ingredients={this.props.ingProps}/>
                <CommandCenter
                    purchase={this.purchaseHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.updatePurchaseState()}
                    totalPrice={this.props.totalPrice}
                    addIngredient={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                />
            </Wrap>;
            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                cancelBtn={this.cancelPurchaseHandler}
                continueBtn={this.continuePurchaseHandler}
                ingredients={this.props.ingProps}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Wrap>
                <Modal
                    closeModal={this.cancelPurchaseHandler}
                    show={this.state.purchasing}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Wrap>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingProps: state.ingredients,
        pricesProps: state.prices,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPricesFetched: (prices) => dispatch({type: actionTypes.STORE_PRICES, payload: {prices: prices}}),
        updateIngredients: (updatedIngredients) => dispatch({
            type: actionTypes.UPDATE_INGREDIENTS,
            payload: {ingredients: updatedIngredients}
        }),
        onIngredientAdded: (ingredientName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            payload: {ingredient: ingredientName}
        }),
        onIngredientRemoved: (ingredientName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            payload: {ingredient: ingredientName}
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
