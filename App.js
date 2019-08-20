import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

// Components
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addNewGoalHandler = newGoal => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { key: Math.random().toString(), value: newGoal}
    ]);
  };

  const removeGoalHandler = goalKey => {
    setCourseGoals(currentGoals => {
      const newGoals = currentGoals.filter(goal => goal.key !== goalKey);
      return newGoals;
    });
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} addNewGoalHandler={addNewGoalHandler} toggleAddMode={setIsAddMode} />
      <FlatList
        data={courseGoals}
        renderItem={itemData => <GoalItem removeGoalHandler={removeGoalHandler} id={itemData.item.key} item={itemData.item.value} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
