import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
}

const renderListItem = (value, numOfRound) => (
  <View style={styles.listItem} key={value}>
    <BodyText>#{numOfRound}: </BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = ({ userChoise, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoise);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // const [rounds, setRounds] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

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
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    // setRounds((currentRound) => currentRound + 1);
    setPastGuesses((oldGuesses) => [nextNumber, ...oldGuesses]);
  };

  useEffect(() => {
    if (currentGuess === userChoise) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoise, onGameOver, pastGuesses.length]);

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={handleNextGuess.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <Button
          title="GREATER"
          onPress={handleNextGuess.bind(this, 'greater')}
        />
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, idx) =>
            renderListItem(guess, pastGuesses.length - idx),
          )}
        </ScrollView>
      </View>
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
  listContainer: {
    // it will not scroll on android without this property
    flex: 1,
    //-----
    width: '80%',
  },
  list: {
    // this logic makes the container to have the height of the available screen space, and moves the list items to the bottom
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    // alignSelf: 'center',// this works too instead of contentContainerStyle on ScrollView
  },
});

export default GameScreen;
