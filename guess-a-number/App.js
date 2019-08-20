import React from 'react';
import { StyleSheet, View } from 'react-native';

// Screems
import StartGameScreen from './screens/StartGameScreen';

// Components
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Guess a Number"></Header>
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
