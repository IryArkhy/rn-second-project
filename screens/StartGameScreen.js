import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/Button';
import COLORS from '../constants/colors';

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4,
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, [setButtonWidth]);

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

  const handleConfirmedStart = () => onStartGame(selectedNumber);

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text> You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={handleConfirmedStart}>START GAME</MainButton>
      </Card>
    );
  }

  // keyboardVerticalOffset = to the size of the imput usually (or vigger)
  return (
    <ScrollView>
      {/* position is good for iOS, padding for android */}
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="30">
        <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
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
                <View style={[styles.button, { width: buttonWidth }]}>
                  <Button
                    title="Reset"
                    color={COLORS.accent}
                    onPress={handleReset}
                  />
                </View>
                <View style={[styles.button, { width: buttonWidth }]}>
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
      </KeyboardAvoidingView>
    </ScrollView>
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
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    width: '80%',
    // maxWidth: '80%'
    maxWidth: '95%', // ensures that the element will no exceed the bondries of the screen and go beyond it
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    // width: 100,
    width: Dimensions.get('window').width / 4, // calculatted when the app starts (!)
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
