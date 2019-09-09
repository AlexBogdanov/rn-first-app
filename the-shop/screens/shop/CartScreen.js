import React from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import DefaultText from './../../components/common/DefaultText';
import TitleText from './../../components/common/TitleText';
import CartItem from './../../components/shop/CartItem';

// Actions
import * as cartActions from './../../store/actions/cart';
import * as ordersActions from './../../store/actions/orders';

import Colors from './../../constansts/Colors';

const CartScreen = props => {
    const { items, totalAmount } = useSelector(state => state.cart);
    const cartItems = [];
    const dispatch = useDispatch();

    Object.keys(items).forEach(key => {
        const cartItem = {
            id: key,
            title: items[key].title,
            price: items[key].price,
            quantity: items[key].quantity,
            sum: items[key].sum
        };

        cartItems.push(cartItem);
    });

    cartItems.sort((a, b) => {
        if (a.id > b.id) {
            return 1;
        } else if (a.id < b.id) {
            return -1;
        } else {
            return 0;
        }
    });

    const removeItem = productId => {
        dispatch(cartActions.removeFromCart(productId));
    };

    const renderItem = itemData => {
        const { item } = itemData

        return <CartItem
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                    sum={item.sum}
                    onDelete={removeItem} />
    };

    const createOrder = () => {
        dispatch(ordersActions.addOrder(cartItems, totalAmount));
        dispatch(cartActions.clearCart());
    };

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <DefaultText>
                    Total amount: <TitleText style={styles.title}>${totalAmount.toFixed(2)}</TitleText>
                </DefaultText>
                <Button color={Colors.primary} title="Order Now" disabled={cartItems.length === 0} onPress={createOrder} />
            </View>
            <View style={styles.list}>
                <TitleText style={styles.listText}>Cart Items:</TitleText>
                <FlatList
                    keyExtractor={item => item.id}
                    data={cartItems}
                    renderItem={renderItem} />
            </View>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 14,
        color: Colors.accent
    },
    list: {

    },
    listText: {
        color: Colors.primary
    }
});

export default CartScreen;
