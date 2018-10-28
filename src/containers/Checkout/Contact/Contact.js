import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './Contact.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from "../../../components/UI/Input/Input";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your name'
                    }
                },
                email: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Enter your email'
                    }
                },
                street: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your street'
                    }
                },
                zipcode: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your zipcode'
                    }
                },
                country: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your country'
                    }
                },
                deliveryMode: {
                    elementType: 'select',
                    value: '',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    }
                }
            },
            loading: false
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let contactData = {};
        for (let item in this.state.form) {
            contactData[item] = this.state.form[item].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            contactData: contactData
        };
        axios.post('/order.json', order)
            .then(response => {
                this.setState({loading: false});
                console.log('Order stored');
                this.props.history.push("/orders");
            })
            .catch(error => {
                this.setState({loading: false});
            });
    };

    inputChangedHandler = (event, elementType) => {
        const updatedOrderForm = {...this.state.form};
        const updatedOrderElement = {...updatedOrderForm[elementType]};
        updatedOrderElement.value = event.target.value;
        updatedOrderForm[elementType] = updatedOrderElement;
        this.setState({form: updatedOrderForm});
    };

    render() {
        let formElements = [];
        for (let elementKey in this.state.form) {
            formElements.push({
                key: elementKey,
                config: this.state.form[elementKey]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElements.map(element => {
                        return <Input key={element.key} elementType={element.config.elementType}
                                      elementConfig={element.config.elementConfig}
                                      changed={(event) => this.inputChangedHandler(event, element.key)}
                                      value={element.config.value}/>
                    })
                }
                <Button clicked={this.orderHandler} buttonType="Success">SUBMIT</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.Contact}>
                <h3>Enter your details</h3>
                {form}
            </div>
        );

    }
}

export default Contact;