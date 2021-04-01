import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import TitleText from './TitleText';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    // fontSize: 18,
    // fontFamily: 'open-sans-bold',
  },
});

export default Header;
