import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Card from '../components/Card';

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Card>
        <Text>Number of rounds: {roundsNumber}</Text>
        <Text>The number was: {userNumber}</Text>
      </Card>
      <Button title="New Game" onPress={onStartNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameOverScreen;
