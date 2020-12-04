import React, { Component } from 'react'
import {View, Text, Pressable} from 'react-native'
import Storage from 'Rick_and_Morty_Api/src/libs/storage'

export class CharcaterDetail extends Component {

    state = {
        character:{},
        isFavorite:false

    }

    toogleFavorite = () => {
        if (this.state.isFavorite) {
            this.removeFavorite()
        }else{
            this.addFavorite()
        }
    }

    removeFavorite = async () => {
        const key = `favorite-${this.state.character.id}`
        await Storage.instance.remove(key)
        this.setState({isFavorite:false})
    }

    addFavorite = async () =>{
        const character = JSON.stringify(this.state.character)
        const key = `favorite-${this.state.character.id}`
        const stored = await Storage.instance.store(key,character)
        if(stored) {
            this.setState({ isFavorite: true });
          }
    }

    getFavorite = async () => {
        try {
            const key = `favorite-${this.state.character.id}`;
      
            const favStr = await Storage.instance.get(key);
      
            if(favStr != null) {
              this.setState({ isFavorite: true });
            }
      
          } catch(err) {
            console.log("get favorites err", err);
          }
    }

    componentDidMount(){

        const char = this.props.route.params.character
        //console.log(this.props.route.params.character)
        console.log(char.name)
       // this.props.navigation.setOptions({title:'lol'})
        this.props.navigation.setOptions({ title: char.name })
        this.setState({character:char}, () => {
            this.getFavorite()
        })
        
    }
    render() {
        const {isFavorite} = this.state
        return (
            <View>
            <Text>ffhfh</Text>
        <Pressable onPress={this.toogleFavorite}>
        <Text>{isFavorite?"remove": "add to fav"}</Text>
        </Pressable>
        </View>
            )
    }
}

export default CharcaterDetail
