import React from 'react';
import classes from './Order.css';

const order = (props) => {

    let ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            quantity: props.ingredients[ingredient]
        });
    }

    const ingredientList = ingredients.map(item => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            padding: '10px',
            border: '1px solid #eee',
            boxShadow: '0px 1px 2px #ccc'
        }} key={item.name}>{item.name} : {item.quantity}</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients:</p>
            {ingredientList}
            <p>Price: <span><strong>${props.price.toFixed(2)}</strong></span></p>
        </div>
    );
};

export default order;