import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import MealList from './../components/MealList';
import DefaultText from './../components/DefaultText';

// Data
import { CATEGORIES } from './../data/dummy-data';

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    const fetchedMeals = useSelector(state => state.meals.filteredMeals);
    const filteredMeals = fetchedMeals.filter(meal => meal.categoryIds.includes(catId));

    if (filteredMeals.length <= 0) {
        return (
            <View style={styles.noMealsContainer}>
                <DefaultText style={styles.noMealsText}>We don`t have appropriate meals in this category, check your fitlers!</DefaultText>
            </View>
        );
    } else {
        return <MealList meals={filteredMeals} navigation={props.navigation} />;
    }
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const fetchedCategory = CATEGORIES.find(cat => cat.id === catId);
    
    return {
        headerTitle: fetchedCategory.title
    };
};

const styles = StyleSheet.create({
    noMealsContainer: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noMealsText: {
        textAlign: 'center'
    }
});

export default CategoryMealsScreen;
