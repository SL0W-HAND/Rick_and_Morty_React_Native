import React, { Component } from 'react'
import {View,Text, Pressable, FlatList, ActivityIndicator} from 'react-native'
import Http from 'Rick_and_Morty_Api/src/libs/http'
import CharacterItem from './CharacterItem'

export class MainScreen extends Component {
  
    state = {
        characters:[],
        loading: false
    }

    componentDidMount = async () => {
        this.setState({loading:true})
        const res = await Http.instance.get("https://rickandmortyapi.com/api/character/?page=19")
        this.setState({characters : res.results, loading:false})
    }

    handlePress = (character) =>{
        this.props.navigation.navigate('CharacterDetail',{character})
    }

    render() {
        const {characters, loading} = this.state
        return (
            <View>
                {loading ? 
                    <ActivityIndicator color="white" size="large"/>
                :null
                }
                <FlatList
                    data={characters}
                    keyExtractor={item => item.name.toString()}
                    renderItem={({ item }) =>
                    <CharacterItem onPress={() => this.handlePress(item)} item={item}/>
                    }
                    renderSectionHeader={({section: {title}}) => <Text>{'lol'}</Text>}  
                />
            </View>
        )
    }
}

export default MainScreen