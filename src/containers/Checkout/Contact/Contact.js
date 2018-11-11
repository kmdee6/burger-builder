import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './Contact.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: {
                    elementType: 'input',
                    value: '',
                    isValid: false,
                    isEdited: false,
                    validation: {
                        required: true
                    },
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your name'
                    }
                },
                email: {
                    elementType: 'input',
                    value: '',
                    isValid: false,
                    isEdited: false,
                    validation: {
                        required: true
                    },
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Enter your email'
                    }
                },
                street: {
                    elementType: 'input',
                    value: '',
                    isValid: false,
                    isEdited: false,
                    validation: {
                        required: true
                    },
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your street'
                    }
                },
                zipcode: {
                    elementType: 'input',
                    value: '',
                    isValid: false,
                    isEdited: false,
                    validation: {
                        required: true,
                        min: 5,
                        max: 5
                    },
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your zipcode'
                    }
                },
                country: {
                    elementType: 'input',
                    value: '',
                    isValid: false,
                    isEdited: false,
                    validation: {
                        required: true
                    },
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your country'
                    }
                },
                deliveryMode: {
                    elementType: 'select',
                    value: 'cheapest',
                    isValid: true,
                    validation: {},
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    }
                }
            },
            isFormValid: false,
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
        console.log('Order', order);
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
        updatedOrderElement.isEdited = true;
        updatedOrderElement.isValid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
        updatedOrderForm[elementType] = updatedOrderElement;
        let isFormValid = true;
        for (let element in updatedOrderForm) {
            isFormValid = isFormValid && updatedOrderForm[element].isValid;
        }
        this.setState({form: updatedOrderForm, isFormValid: isFormValid});
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.min) {
            isValid = isValid && (value.length >= rules.min);
        }
        if (rules.max) {
            isValid = isValid && (value.length <= rules.max);
        }
        return isValid;
    }

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
                                      valid={element.config.isValid}
                                      touched={element.config.isEdited}
                                      changed={(event) => this.inputChangedHandler(event, element.key)}
                                      value={element.config.value}/>
                    })
                }
                <Button disabled={!this.state.isFormValid} clicked={this.orderHandler}
                        buttonType="Success">SUBMIT</Button>
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(Contact);