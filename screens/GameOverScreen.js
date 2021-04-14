import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/Button';

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={[DefaultStyles.bodyTitleText, styles.title]}>
          The Game is Over!
        </Text>
        <View style={styles.imgContainer}>
          <Image
            style={styles.successImg}
            //local
            source={require('../assets/img/success.png')}
            //web: you have to make the width and the height
            // web images have fading effect when loading react adss it for free
            // source={{
            //   uri:
            //     'https://images.unsplash.com/photo-1617128734662-66da6c1d3505?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1403&q=80',
            // }}
            fadeDuration={2000}
            resizeMode="cover" // contain, ...
          />
        </View>
        <Card>
          <BodyText style={styles.bodyText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess
            the number
            <Text style={styles.highlight}> {userNumber}</Text>
          </BodyText>
        </Card>
        <MainButton onPress={onStartNewGame}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  title: {
    marginBottom: 20,
  },
  imgContainer: {
    // width: 250,
    // height: 250,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    // borderRadius: 200,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    // marginBottom: 20,
    marginVertical: Dimensions.get('window').height / 20, // = 5% of the device height
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  successImg: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  bodyText: {
    textAlign: 'center',
  },
});

export default GameOverScreen;
