import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('order.json').then(response => {
            const fetchedOrders = [];
            for (let orderKey in response.data) {
                fetchedOrders.push({
                    ...response.data[orderKey],
                    id: orderKey
                });
            }
            console.log(fetchedOrders);
            this.setState({orders: fetchedOrders, loading: false});
        }).catch(error => {
            this.setState({loading: false});
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order
                        ingredients={order.ingredients}
                        price={+order.price}
                        key={order.id} />
                })};
            </div>);
    }
}

export default withErrorHandler(Orders, axios);