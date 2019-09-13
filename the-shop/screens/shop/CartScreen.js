import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Button,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import DefaultText from './../../components/common/DefaultText';
import TitleText from './../../components/common/TitleText';
import CartItem from './../../components/shop/CartItem';
import Card from './../../components/common/Card';

// Actions
import * as cartActions from './../../store/actions/cart';
import * as ordersActions from './../../store/actions/orders';

import Colors from './../../constansts/Colors';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const { items, totalAmount } = useSelector(state => state.cart);
    const cartItems = [];
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{ text: 'Okay!' }]);
        }
    }, [error]);

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
        const { item } = itemData;

        return <CartItem
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                    sum={item.sum}
                    onDelete={removeItem}
                    isDeletable />
    };

    const createOrder = () => {
        setError(null);
        setIsLoading(true);

        dispatch(ordersActions.addOrder(cartItems, totalAmount, 'u1'))
            .then(() => {
                dispatch(cartActions.clearCart());
                setIsLoading(false);
            }).catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    } else {
        return (
            <View style={styles.screen}>
                <Card style={styles.summary}>
                    <DefaultText>
                        Total amount: <TitleText style={styles.title}>${totalAmount.toFixed(2)}</TitleText>
                    </DefaultText>
                    <Button color={Colors.primary} title="Order Now" disabled={cartItems.length === 0} onPress={createOrder} />
                </Card>
                <View style={styles.list}>
                    <TitleText style={styles.listText}>Cart Items:</TitleText>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={cartItems}
                        renderItem={renderItem} />
                </View>
            </View>
        );
    }
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
        padding: 10
    },
    title: {
        fontSize: 14,
        color: Colors.accent
    },
    list: {

    },
    listText: {
        color: Colors.primary
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CartScreen;
