import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import MealList from './../components/MealList';
import CustomHeaderButton from './../components/CustomHeaderButton';

// Data
import { MEALS } from './../data/dummy-data';

const FavouritesScreen = props => {
    const fetchedMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');

    return <MealList meals={fetchedMeals} navigation={props.navigation} />;
};

FavouritesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Your Favourites',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={navigationData.navigation.toggleDrawer} />
            </HeaderButtons>
        )
    };
};

export default FavouritesScreen;
