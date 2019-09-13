import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    FlatList,
    Platform,
    View,
    ActivityIndicator,
    Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from './../../components/common/CustomHeaderButton';
import OrderItem from './../../components/shop/OrderItem';

import * as ordersActions from './../../store/actions/orders';
import Colors from '../../constansts/Colors';

const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch();
    
    const loadOrders = useCallback(userId => {
        setIsLoading(true);
        setError(null);

        dispatch(ordersActions.fetchOrders(userId))
            .then(() => { setIsLoading(false); })
            .catch(err => {
                console.log('err', err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadOrders('u1');
    }, [loadOrders]);

    const renderItem = itemData => {
        const { totalAmount, readableDate, items } = itemData.item;
        return (
            <OrderItem
                price={totalAmount}
                date={readableDate}
                items={items} />
        );
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    } else if (!isLoading && error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>  
        );
    } else {
        return (
            <FlatList
                keyExtractor={item => item.id}
                data={orders}
                renderItem={renderItem} />
        );
    }
};

OrderScreen.navigationOptions = navData => {
    const toggleDrawer = () => {
        navData.navigation.toggleDrawer();
    };

    return {
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? "md-menu" : "ios-menu"}
                    onPress={toggleDrawer} />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrderScreen;
