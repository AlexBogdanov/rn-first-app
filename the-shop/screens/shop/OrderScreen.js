import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from './../../components/common/CustomHeaderButton';
import OrderItem from './../../components/shop/OrderItem';

const OrderScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    const renderItem = itemData => {
        const { totalAmount, readableDate, items } = itemData.item;
        return (
            <OrderItem
                price={totalAmount}
                date={readableDate}
                items={items} />
        );
    };

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={orders}
            renderItem={renderItem} />
    );
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

export default OrderScreen;
