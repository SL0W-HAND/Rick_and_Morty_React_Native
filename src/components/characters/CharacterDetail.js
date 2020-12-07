import React, { Component } from 'react'
import {View, Text, Pressable,StyleSheet, Image } from 'react-native'
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

    getCharacter(){
        const character = this.props.route.params.character
        this.props.navigation.setOptions({ title: character.name })
        this.setState({character:character}, () => {
            this.getFavorite()
        })
    }

    componentDidMount(){
        this.getCharacter()
    }

    render() {
        const {isFavorite, character} = this.state
        console.log(character)
        return (
            <View>
                <View></View>
                <View>
                <Image
                style={styles.image}
               source={{ uri: character.image }}
                />
                </View>
                <Pressable onPress={this.toogleFavorite}>
                <Text>{isFavorite?"remove": "add to fav"}</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
 image:{
     height:145,
     width:145
 }
})

export default CharcaterDetail
