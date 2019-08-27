import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

// Components
import CustomHeaderButton from './../components/CustomHeaderButton';
import DefaultText from './../components/DefaultText';
import ListItem from './../components/ListItem';

import { toggleFavourite } from './../store/actions/meals';

const MealDetailsScreen = props => {
    const mealId = props.navigation.getParam('mealId');
    const fetchedMeals = useSelector(state => state.meals.meals);
    const meal = fetchedMeals.find(meal => meal.id === mealId);
    const isFav = useSelector(state => state.meals.favourites.some(meal => meal.id === mealId));

    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
    }, [toggleFavouriteHandler]);

    useEffect(() => {
        props.navigation.setParams({ isFav });
    }, [isFav]);

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <Image style={styles.img} source={{ uri: meal.imageUrl }} />
            <View style={styles.details}>
                <DefaultText>{meal.duration}m</DefaultText>
                <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
            </View>
            <View style={styles.prepContainer}>
                <View>
                    <Text style={styles.title}>Ingredients</Text>
                    {meal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
                </View>
                <View>
                    <Text style={styles.title}>Steps</Text>
                    {meal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
                </View>
            </View>
        </ScrollView>
    );
};

MealDetailsScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const isFav = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Favourite"
                iconName= { isFav ? "ios-star" : "ios-star-outline" }
                onPress={navigationData.navigation.getParam('toggleFav')} />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        padding: 15
    },
    img: {
        width: '100%',
        height: 200
    },
    details: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-around'
    },
    prepContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    }
});

export default MealDetailsScreen;
