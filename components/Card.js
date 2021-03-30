import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    // this works on iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6, // default (if you make it 0, the shadow on left top and right will desapear)
    // ------this for android
    elevation: 5,
    // ----------------------
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
