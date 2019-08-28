import { createStackNavigator, createAppContainer } from 'react-navigation';

// Screens
import ProductsOverviewScreen from './../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from './../screens/shop/ProductDetailsScreen';
import CartScreen from './../screens/shop/CartScreen';

import Colors from './../constansts/Colors';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
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
    }
});

export default createAppContainer(ProductsNavigator);
