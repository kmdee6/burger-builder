import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement;
    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}/>;
            break;
        case 'textarea':
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}/>;
        case 'select':
            inputElement = (<select
                className={classes.InputElement}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}>
                {props.elementConfig.options.map(optionItem => {
                    return <option key={optionItem.value} value={optionItem.value}>{optionItem.displayValue}</option>
                })}
            </select>);
            break;

        default:
            inputElement = null;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>

    );
};

export default input;