import { createStackNavigator, createAppContainer } from 'react-navigation';

// Screens
import ProductsOverviewScreen from './../screens/shop/ProductsOverviewScreen';

import Colors from './../constansts/Colors';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(ProductsNavigator);
