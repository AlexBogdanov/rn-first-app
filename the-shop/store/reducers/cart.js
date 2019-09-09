import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './../actions/cart';

import CartItem from './../../models/cartItem';

const initialState = {
    items: {},
    totalAmount: 0
};

const addSum = (sum1, sum2) => {
    const result = sum1 + sum2;
    return Number(result.toFixed(2));
};

const removeSum = (sum1, sum2) => {
    const result = sum1 - sum2;
    return Number(result.toFixed(2));
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART: {
            const { product } = action;
            let updatedState = {};

            if (state.items[product.id]) {
                const updatedProduct = new CartItem(
                    state.items[product.id].title,
                    state.items[product.id].price,
                    state.items[product.id].quantity + 1,
                    state.items[product.id].sum + product.price
                );

                updatedState = {
                    ...state,
                    items: { ...state.items, [product.id]: updatedProduct },
                    totalAmount: addSum(state.totalAmount, product.price)
                };
            } else {
                const newProduct = new CartItem(product.title, product.price, 1, product.price);
                updatedState = {
                    ...state,
                    items: { ...state.items, [product.id]: newProduct },
                    totalAmount: addSum(state.totalAmount, product.price)
                };
            }

            return updatedState;
        }
        case REMOVE_FROM_CART: {
            const { productId } = action;
            const prodPrice = state.items[productId].price;
            let updatedState;

            if (state.items[productId].quantity > 1) {
                const updatedProduct = new CartItem(
                    state.items[productId].title,
                    state.items[productId].price,
                    state.items[productId].quantity - 1,
                    state.items[productId].sum - prodPrice
                );

                updatedState = {
                    ...state,
                    items: { ...state.items, [productId]: updatedProduct },
                    totalAmount: removeSum(state.totalAmount, prodPrice)
                };
            } else {
                const updatedItems = { ...state.items };
                delete updatedItems[productId];

                updatedState = {
                    ...state,
                    items: updatedItems,
                    totalAmount: removeSum(state.totalAmount, prodPrice)
                };
            }

            return updatedState;
        }
        case CLEAR_CART: {
            const updatedState = initialState;
            return updatedState;
        }
        default: {
            return state;
        }
    }
};

export default cartReducer;
