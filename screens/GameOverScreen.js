import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
  return (
    <View style={styles.screen}>
      <Text style={[DefaultStyles.bodyTitleText, styles.title]}>
        The Game is Over!
      </Text>
      <View style={styles.imgContainer}>
        <Image
          style={styles.successImg}
          //local
          // source={require('../assets/img/success.png')}
          //web: you have to make the width and the height
          // web images have fading effect when loading react adss it for free
          source={{
            uri:
              'https://images.unsplash.com/photo-1617128734662-66da6c1d3505?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1403&q=80',
          }}
          fadeDuration={2000}
          resizeMode="cover" // contain, ...
        />
      </View>
      <Card>
        <BodyText>Number of rounds: {roundsNumber}</BodyText>
        <BodyText>The number was: {userNumber}</BodyText>
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
  title: {
    marginBottom: 20,
  },
  imgContainer: {
    width: 250,
    height: 250,
    borderRadius: 200,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  successImg: {
    width: '100%',
    height: '100%',
  },
});

export default GameOverScreen;
