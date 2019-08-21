import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// Screens
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// Components
import Header from './components/Header';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [selectedNum, setSelectedNum] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [initLoad, setInitLoad] = useState(false);

  if (!initLoad) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setInitLoad(true)} />;
  }

  const startGameHandler = (chosenNumber) => {
    setSelectedNum(chosenNumber);
  }

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  };

  const startNewGameHanderl = () => {
    setGuessRounds(0);
    setSelectedNum(null);
  };

  let screen = <StartGameScreen onGameStart={startGameHandler} />

  if (selectedNum && guessRounds <= 0) {
    screen = <GameScreen selectedNum={selectedNum} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    screen = <GameOverScreen rounds={guessRounds} number={selectedNum} onNewGame={startNewGameHanderl} />
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number"></Header>
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
