import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        salad: 0,
        meat: 0
    },
    prices: null,
    totalPrice: 3
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_PRICES:
            return {
                ...state,
                prices: action.payload.prices
            };
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
                },
                totalPrice: state.totalPrice + state.prices[action.payload.ingredient]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1
                },
                totalPrice: state.totalPrice - state.prices[action.payload.ingredient]
            };

        case actionTypes.UPDATE_PRICE:
            return {
                ...state,
                totalPrice: action.payload.price
            };
        default:
            return state;
    }
};

export default reducer;