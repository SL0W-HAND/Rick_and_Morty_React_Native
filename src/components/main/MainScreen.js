import React, { Component } from 'react'
import {View,Text, Pressable} from 'react-native'
//import Http from 'Rick_and_Morty_Api/src/libs/http'

export class MainScreen extends Component {
  
    /*
componentDidMount = async () => {
   //const personages = await Http.instance.get("https://rickandmortyapi.com/api/character/?page=34")
   //console.log(personages)
}*/

handlePress = () =>{
 this.props.navigation.navigate('Personage Detail')
}

    render() {
        return (
            <View>
                <Text>
                    works lol
                </Text>
                <Pressable onPress={this.handlePress}><Text>lolol</Text></Pressable>
            </View>
        )
    }
}

export default MainScreen
