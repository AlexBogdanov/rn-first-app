import React from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Screens
import ProductsOverviewScreen from './../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from './../screens/shop/ProductDetailsScreen';
import CartScreen from './../screens/shop/CartScreen';
import OrdersScreen from './../screens/shop/OrderScreen';

import Colors from './../constansts/Colors';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: 'white'
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return (
                <Ionicons
                    name={Platform.OS === 'android' ? "md-cart" : "ios-cart"}
                    size={23}
                    color={drawerConfig.tintColor} />
            );
        }
    },
    defaultNavigationOptions
});

const OrdersNavigatior = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return (
                <Ionicons
                    name={Platform.OS === 'android' ? "md-list" : "ios-list"}
                    size={23}
                    color={drawerConfig.tintColor} />
            );
        }
    },
    defaultNavigationOptions
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigatior
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);
