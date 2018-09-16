import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';

import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


export default class App extends Component {
  render() {
    return (
      <View style={styles.container} behavior="padding">
        <ImageBackground
          source={getImageForWeather('Clear')}
          imageStyle={styles.styleImage}
          style={styles.imageContainer}
        >
          <Text style={[styles.textStyle, styles.smallText, {color: '#666'}]}>Weather Updates</Text>
          <SearchInput place="Enter City" />
          <View style={styles.detailsContainer}>
            <Text style={[styles.textStyle, styles.largeText]}> 
              Dhaka
            </Text>
            <Text style={[styles.textStyle, styles.smallText]}>
              Clear
            </Text>
            <Text style={[styles.textStyle, styles.largeText]}>
              24°C
            </Text>
          </View>
        </ImageBackground>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex:1,
  },
  styleImage: {
    width: null,
    height: null,
    resizeMode: 'cover',
    flex:1,
  },
  detailsContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  textStyle: {
    textAlign: 'center',
    color: '#ffff',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 40,
  },
  smallText: {
    fontSize: 25,
  },
});
