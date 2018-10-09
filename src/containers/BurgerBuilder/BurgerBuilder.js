import React, {Component} from "react";
import Wrap from "../../hoc/Wrap/Wrap";
import Burger from "../../components/Burger/Burger";
import CommandCenter from "../../components/Burger/CommandCenter/CommandCenter";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const PRICES = {
    salad: 0.3,
    cheese: 0.5,
    meat: 1.2,
    bacon: 1.3
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                cheese: 0,
                meat: 0,
                bacon: 0
            },
            totalPrice: 3,
            purchaseable: false,
            purchasing: false,
            loading: false
        };
    }

    updatePurchaseState = updatedIngredients => {
        const ingredientCount = Object.keys(updatedIngredients)
            .map(ingredient => {
                return updatedIngredients[ingredient];
            })
            .reduce((ingredientCount, element) => {
                return ingredientCount + element;
            });
        this.setState({purchaseable: ingredientCount > 0});
    };

    addIngredientHandler = type => {
        const updatedIngredients = {...this.state.ingredients};
        const ingredientCount = updatedIngredients[type];
        updatedIngredients[type] = ingredientCount + 1;
        const price = this.state.totalPrice;
        const totalPrice = price + PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: totalPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const updatedIngredients = {...this.state.ingredients};
        const ingredientCount = updatedIngredients[type];
        if (ingredientCount > 0) {
            updatedIngredients[type] = ingredientCount - 1;
            const price = this.state.totalPrice;
            const totalPrice = price - PRICES[type];
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: totalPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    };

    continuePurchaseHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Dinesh",
                phone: "9500492881",
                email: "km@d.com"
            },
            deliveryMode: 'fastest'
        };
        axiosOrders.post('/order.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    };

    render() {
        let disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        let orderSummary = <OrderSummary
            price={this.state.totalPrice}
            cancelBtn={this.cancelPurchaseHandler}
            continueBtn={this.continuePurchaseHandler}
            ingredients={this.state.ingredients}
        />;
        if (this.state.loading) {
            orderSummary = <Spinner/>;
            console.log('Loading is true');
        }

        return (
            <Wrap>
                <Modal
                    closeModal={this.cancelPurchaseHandler}
                    show={this.state.purchasing}
                >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <CommandCenter
                    purchased={this.purchaseHandler}
                    disabledInfo={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    totalPrice={this.state.totalPrice}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                />
            </Wrap>
        );
    }
}

export default BurgerBuilder;
