import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// Screens
import CategoriesScreen from './../screens/CategoriesScreen';
import CategoryMealsScreen from './../screens/CategoryMealsScreen';
import MealDetailsScreen from './../screens/MealDetailsScreen';
import FavouritesScreen from './../screens/FavouritesScreen';
import FiltersScreen from './../screens/FiltersScreen';

import Colors from './../constants/Colors';

// Stack navigators
const defaultStackNavOptions = {
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
};

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetails: MealDetailsScreen
}, defaultStackNavOptions);

const FavNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetails: MealDetailsScreen
}, defaultStackNavOptions);

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, defaultStackNavOptions);

// Bottom tab navigators
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans' }}>Meals</Text> : 'Meals'
        } 
    },
    Favourites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.secondary
        }
    }
};

const MealsFavNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true
    })
    : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.secondary,
        labelStyle: {
            fontFamily: 'open-sans'
        }
    }
});

// Drawer navigators
const mainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.secondary,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(mainNavigator);
