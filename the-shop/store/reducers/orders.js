import { ADD_ORDER, SET_ORDERS } from './../actions/orders';
import Order from './../../models/order';

const initialState = {
    orders: []
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS: {
            const { orders } = action;
            const updatedOrders = orders;

            console.log(updatedOrders);
            
            const updatedState = {
                ...state,
                orders: updatedOrders
            };
            return updatedState;
        }
        case ADD_ORDER: {
            const { id, items, amount, date } = action.orderData;
            const newOrder = new Order(id, items, amount, date);
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
