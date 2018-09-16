import React, {Component} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default class SearchInput extends Component {
    render(){
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder={this.props.place}
                    placeholderTextColor="white"
                    style = {styles.textInput}
                    autoCorrect={false}
                    underlineColorAndroid= 'transparent'
                    clearButtonMode='always'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 30,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      textInput: {
        flex: 1,
        color: 'white',
        fontSize: 18,
      },
});