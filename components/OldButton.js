import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import colors from '../constants/colors';

const MainButton = ({ children, onPress }) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    // <ButtonComponent activeOpacity={0.7} onPress={onPress}>
    //   <View style={styles.button}>
    //     <Text style={styles.buttonText}>{children}</Text>
    //   </View>
    // </ButtonComponent>

    // Ripple effect on android does not respect the borderRadious
    // So the hack is to wrap the button into one view
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.7} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
    width: '90%',
  },
});

export default MainButton;
