import React, { Component } from 'react'
import {View, Text, Pressable,StyleSheet, Image, Button,FlatList } from 'react-native'
import Storage from 'Rick_and_Morty_Api/src/libs/storage'

export class CharcaterDetail extends Component {

    state = {
        character:{},
        location:{},
        origin:{},
        episodes:[],
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

    isfav(fav){
        if (fav) {
            return(
                <Button
                style={styles.button}
                onPress={() => this.toogleFavorite()}
                title="♡"
                color="black"
            /> 
            ) 
        }else{
            return(
                <Button
                style={styles.button}
                onPress={() => this.toogleFavorite()}
                title="♡"
                color="black"
            /> 
          )
        }
    }

    getCharacter(){
        const character = this.props.route.params.character
        this.props.navigation.setOptions({ 
            title: character.name,
            headerRight: () => (this.isfav(this.state.isFavorite))
        })
        this.setState({character:character, location:character.location, origin:character.origin, episodes:character.episodes}, () => {
            this.getFavorite()
        })
    }

    componentDidMount(){
        this.getCharacter()
    }

    render() {
        const {isFavorite, character, location,origin, episodes} = this.state
        return (
            <View style={styles.container}>
                
                    <Image
                        style={styles.image}
                        source={{ uri: character.image }}
                    />
            
                    <View>
                        <Text style={styles.text}>status: {character.status} </Text>
                        <Text style={styles.text}>species: {character.species} </Text>
                        {character.type == "" ?
                            null
                            :<Text style={styles.text}>type:{character.type} </Text> 
                        }
                        <Text style={styles.text}>gender: {character.gender} </Text>
                        <Text style={styles.text}>origin: {origin.name} </Text>
                        <Text style={styles.text}>location: {location.name} </Text>
                        
                    </View>
                    <Pressable  onPress={this.toogleFavorite}>
                        <Text>{isFavorite?"remove": "add to fav"}</Text>
                    </Pressable>
        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    image:{
        height:145,
        width:145,
        borderRadius:72.5,
        marginVertical:20
    },
    button:{
       
        padding:50
    },
    text:{
        fontFamily:"Segoe UI",
        fontSize:17,
        marginVertical:3,
        marginHorizontal:15
    }
})

export default CharcaterDetail
