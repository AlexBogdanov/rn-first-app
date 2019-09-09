import { ADD_ORDER } from './../actions/orders';
import Order from './../../models/order';

const initialState = {
    orders: []
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER: {
            const { items, amount } = action.orderData;
            const newOrder = new Order(new Date().toString(), items, amount, new Date());
            const updatedState = {
                ...state,
                orders: state.orders.concat(newOrder)
            };
            
            return updatedState;
        }
        default: {
            return state;
        }
    }
};

export default ordersReducer;
