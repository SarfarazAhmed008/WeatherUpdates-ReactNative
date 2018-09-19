import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import {fetchLocationId, fetchWeather} from './utils/api';
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : false,
      error : false,
      location : '',
      weather : '',
      temperature : 0,
      minTemp: 0,
      maxTemp: 0,
      humidity: 0.0,
    };
  }
  componentDidMount(){
    this.updateNewLocationHandler('Dhaka');
  }
  updateNewLocationHandler = async city => {
    if(!city) return;
    this.setState({loading: true}, async () => {
      try{
        const locationId = await fetchLocationId(city);
        const {location, weather, temperature, minTemp, maxTemp, humidity, } = await fetchWeather(locationId);
        this.setState({
          loading : false,
          error: false,
          location,
          weather,
          temperature,
          minTemp,
          maxTemp,
          humidity,         
        });
      }catch (e){
        this.setState({
          loading: false,
          error:true,
        });
      }
    });
  };
  render() {
    //const location = "Dhaka";
    const { location, weather, temperature, loading, error, minTemp, maxTemp, humidity } = this.state;
    return (
      <View style={styles.container}> 
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          imageStyle={styles.styleImage}
          style={styles.imageContainer}
        >
          <Text style={[styles.textStyle, styles.smallText, {color: '#fff'}]}>SA Weather Updates</Text>
          <SearchInput place="Enter City"  onSubmit={this.updateNewLocationHandler} />
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} size="large" color="#0000ff" />
            {!loading && (
              <View style={styles.extraStyle}>
                {error && (
                  <Text style={[styles.textStyle, styles.smallText]}>
                    Could not load the weather update for this city.
                    Please, try with another city.
                  </Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.textStyle, styles.largeText]}> 
                      {location}
                    </Text>
                    <Text style={[styles.textStyle, styles.mediumText]}>
                      {weather} 
                    </Text> 
                    <Text style={[styles.textStyle, styles.largeText]}>
                      {`${Math.round(temperature)}°`}
                    </Text>                 
                    <Text style={[styles.textStyle, styles.smallText]}>
                      Max: {`${Math.round(maxTemp)}°`}, Min: {`${Math.round(minTemp)}°`}
                    </Text>    
                    <Text style={[styles.textStyle, styles.smallText]}>
                      Humidity: {humidity}%
                    </Text>
                  </View>
                )}
              </View>
            )} 
          </View>
        </ImageBackground>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcffff',
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
  mediumText: {
    fontSize: 30,
  },
  smallText: {
    fontSize: 20,
  },
  extraStyle :{
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 30,
    marginLeft: 30,
  },
});
