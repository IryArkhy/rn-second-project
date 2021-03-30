import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import COLORS from '../constants/colors';

const StartGameScreen = () => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const handleOnChange = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };
  const handleCloseKeyboard = () => Keyboard.dismiss();
  const handleReset = () => {
    setEnteredValue('');
    Keyboard.dismiss();
    setConfirmed(false);
  };
  const handleStart = () => {
    const chosenNumber = parseInt(enteredValue, 10);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: handleReset }],
      );
      return;
    }
    setConfirmed(true);
    setEnteredValue(''); // will be set on the next render cycle
    setSelectedNumber(chosenNumber);
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text> You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="START GAME" />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            options={{
              blurOnSubmit: true,
              autoCorrect: false,
              keyboardType: 'number-pad',
              maxLength: 2,
              onChangeText: handleOnChange,
              value: enteredValue,
            }}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={COLORS.accent}
                onPress={handleReset}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Start"
                color={COLORS.primary}
                onPress={handleStart}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start', // default
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
