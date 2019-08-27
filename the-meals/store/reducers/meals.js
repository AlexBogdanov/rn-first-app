import { MEALS } from './../../data/dummy-data';
import { TOGGLE_FAVOURITE, SET_FILTERS } from './../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favourites: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE:{
            const { mealId } = action;
            const index = state.favourites.findIndex(meal => meal.id === mealId);
            let updatedState = {};

            if (index > -1) {
                const updatedFavourites = [...state.favourites];
                updatedFavourites.splice(index, 1);
                updatedState = { ...state, favourites: updatedFavourites };
            } else {
                const meal = state.meals.find(meal => meal.id === mealId);
                const updatedFavourites = [...state.favourites, meal];
                updatedState = { ...state, favourites: updatedFavourites };
            }

            return updatedState;
        }
        case SET_FILTERS: {
            const { filters } = action;
            const filteredMeals = state.meals.filter(meal => {
                if (filters.isGlutenFree && !meal.isGlutenFree) {
                    return false;
                } else if (filters.isLactoseFree && !meal.isLactoseFree) {
                    return false;
                } else if (filters.isVegan && !meal.isVegan) {
                    return false;
                } else if (filters.isVegetarian && !meal.isVegetarian) {
                    return false;
                } else {
                    return true;
                }
            });

            const updatedState = { ...state, filteredMeals };
            return updatedState;
        }
        default:
            return state;
    }
};

export default mealsReducer;
