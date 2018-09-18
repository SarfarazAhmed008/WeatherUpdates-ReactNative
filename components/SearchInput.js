import React, {Component} from 'react';
import { StyleSheet, TextInput, View, } from 'react-native';

export default class SearchInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            newLocation: '',
        };
    }
    changeLocationHandler = (newLocation) => {
        this.setState({newLocation});
    }
    submitLocationHandler = () => {
        const {onSubmit} = this.props;
        const {newLocation} = this.state;
        if(!newLocation) return;
        onSubmit(newLocation);
        this.setState({newLocation: ''});
    }
  
    render(){
        const {place} = this.props;
        const {newLocation} = this.state;
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder={place}
                    placeholderTextColor="white"
                    style = {styles.textInput}
                    autoCorrect={false}
                    underlineColorAndroid= 'transparent'
                    clearButtonMode='always'
                    value={newLocation}
                    onChangeText={this.changeLocationHandler}
                    onSubmitEditing={this.submitLocationHandler}
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