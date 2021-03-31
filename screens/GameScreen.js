import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
}

const GameScreen = ({ userChoise, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoise),
  );
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const handleNextGuess = (direction) => {
    const wrongHintWhenLower =
      direction === 'lower' && currentGuess < userChoise;
    const wrongHintWhenGreater =
      direction === 'greater' && currentGuess > userChoise;

    if (wrongHintWhenLower || wrongHintWhenGreater) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setRounds((currentRound) => currentRound + 1);
  };

  useEffect(() => {
    if (currentGuess === userChoise) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoise, onGameOver, rounds]);

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={handleNextGuess.bind(this, 'lower')} />
        <Button
          title="GREATER"
          onPress={handleNextGuess.bind(this, 'greater')}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
