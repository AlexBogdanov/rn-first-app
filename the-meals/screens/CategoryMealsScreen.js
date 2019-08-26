import React from 'react';

// Components
import MealList from './../components/MealList';

// Data
import { CATEGORIES, MEALS } from './../data/dummy-data';

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    const fetchedMeals = MEALS.filter(meal => meal.categoryIds.includes(catId));

    return <MealList meals={fetchedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const fetchedCategory = CATEGORIES.find(cat => cat.id === catId);
    
    return {
        headerTitle: fetchedCategory.title
    };
};

export default CategoryMealsScreen;
