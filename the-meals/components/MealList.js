import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import MealItem from './../components/MealItem';

const MealList = props => {
    const favouriteMeals = useSelector(state => state.meals.favourites);

    const redirectToMealDetails = (mealId, mealTitle) => {
        const isFav = favouriteMeals.some(meal => meal.id, mealId);

        props.navigation.navigate({
            routeName: 'MealDetails',
            params: {
                mealId,
                mealTitle,
                isFav
            }
        });
    };

    const renderItem = itemData => {
        return <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        imgUrl={itemData.item.imageUrl}
        onClick={() => redirectToMealDetails(itemData.item.id, itemData.item.title)} />
    };

    return (
        <View style={{ ...styles.screen, ...props.style }}>
            <FlatList keyExtractor={item => item.id} data={props.meals} renderItem={renderItem} style={{ width: '100%' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }});

export default MealList;
