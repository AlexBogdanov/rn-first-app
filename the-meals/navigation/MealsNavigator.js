import { createAppContainer, createStackNavigator } from 'react-navigation';

// Screens
import CategoriesScreen from './../screens/CategoriesScreen';
import CategoryMealsScreen from './../screens/CategoryMealsScreen';
import MealDetailsScreen from './../screens/MealDetailsScreen';

import Colors from './../constants/Colors';

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetails: MealDetailsScreen
}, {
    defaultNavigationOptions: {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: 'white'
    }
});

export default createAppContainer(MealsNavigator);
