import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import TitleText from './TitleText';

const Header = ({ title }) => {
  // const headerStyles =
  //   Platform.OS === 'ios' ? styles.headerIOS : styles.headerAndroid;
  return (
    // <View style={[styles.headerBase, headerStyles]}>
    <View
      style={[
        styles.headerBase,
        Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      ]}
    >
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    // backgroundColor: Platform.OS === 'ios' ? 'white' : COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    // borderWidth: Platform.OS === 'ios' ? 1 : 0,
  },
  headerIOS: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  headerAndroid: {
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? COLORS.primary : 'white',
    // fontSize: 18,
    // fontFamily: 'open-sans-bold',
  },
});

export default Header;
