import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

// Components
import MealList from './../components/MealList';
import CustomHeaderButton from './../components/CustomHeaderButton';
import DefaultText from './../components/DefaultText';

const FavouritesScreen = props => {
    const fetchedMeals = useSelector(state => state.meals.favourites);

    if (!fetchedMeals || fetchedMeals.length <= 0) {
        return (
            <View style={styles.noFavsContainer}>
                <DefaultText>You have no favourite recipes, yet!</DefaultText>
            </View>
        );
    } else {
        return <MealList meals={fetchedMeals} navigation={props.navigation} />;
    }
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

const styles = StyleSheet.create({
    noFavsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavouritesScreen;
