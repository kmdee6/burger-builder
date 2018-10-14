import React, {Component} from "react";
import Wrap from "../../hoc/Wrap/Wrap";
import Burger from "../../components/Burger/Burger";
import CommandCenter from "../../components/Burger/CommandCenter/CommandCenter";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            prices: null,
            totalPrice: 3,
            purchasable: false,
            purchasing: false,
            loading: true,
            error: false
        };
    }

    componentWillMount() {
        axios.get('https://react-burger-64656.firebaseio.com/prices.json')
            .then(response => {
                this.setState({prices: response.data, loading: false});
            }).catch(error => this.setState({loading: false, error: true}))
    }

    updatePurchaseState = updatedIngredients => {
        const ingredientCount = Object.keys(updatedIngredients)
            .map(ingredient => {
                return updatedIngredients[ingredient];
            })
            .reduce((ingredientCount, element) => {
                return ingredientCount + element;
            });
        this.setState({purchasable: ingredientCount > 0});
    };

    addIngredientHandler = type => {
        const updatedIngredients = {...this.state.ingredients};
        const ingredientCount = updatedIngredients[type];
        updatedIngredients[type] = ingredientCount + 1;
        const price = this.state.totalPrice;
        const totalPrice = price + this.state.prices[type];
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
            const totalPrice = price - this.state.prices[type];
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
        axios.post('/order.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    };

    componentDidMount() {
        axios.get('https://react-burger-64656.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                this.updatePurchaseState(response.data);
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    render() {
        let disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Unable to fetch ingredients.</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = <Wrap><Burger ingredients={this.state.ingredients}/>
                <CommandCenter
                    purchased={this.purchaseHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.state.purchasable}
                    totalPrice={this.state.totalPrice}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                />
            </Wrap>;
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                cancelBtn={this.cancelPurchaseHandler}
                continueBtn={this.continuePurchaseHandler}
                ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
