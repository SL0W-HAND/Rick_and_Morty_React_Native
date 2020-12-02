import React, { Component } from 'react'
import {View,Text, Pressable, FlatList} from 'react-native'
import Http from 'Rick_and_Morty_Api/src/libs/http'

export class MainScreen extends Component {
  
state = {
    characters:[]
}

componentDidMount = async () => {
    const lol = 9
    console.log(lol)
    
    const res = await Http.instance.get("https://rickandmortyapi.com/api/character/?page=19")
    this.setState({characters : res.results})
 
}

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
                <FlatList
                    data={this.state.characters}
                    keyExtractor={item => item.name.toString()}
                    renderItem={({ item }) =>
                    <Text>{item.name}</Text>
                    }
                    
                />
            </View>
        )
    }
}

export default MainScreen
