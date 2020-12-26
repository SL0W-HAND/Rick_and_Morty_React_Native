import React, { Component } from 'react'
import {View, Text, Pressable,StyleSheet, Image, Button,ScrollView } from 'react-native'
import Storage from 'Rick_and_Morty_Api/src/libs/storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import DotIcon from 'react-native-vector-icons/Octicons'

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
        this.props.navigation.setOptions({ 
            //icon to add favorite
            headerRight: () => (
                <Icon
                    onPress={() => this.toogleFavorite()}
                    name={this.state.isFavorite?"heart":"heart-o"}
                    backgroundColor="transparent"
                    color="black"
                    style={styles.headButton}
                />  
            )
        })
    }

    addFavorite = async () =>{
        const character = JSON.stringify(this.state.character)
        const key = `favorite-${this.state.character.id}`
        const stored = await Storage.instance.store(key,character)
        if(stored) {
            this.setState({ isFavorite: true });
        }
        //update icon of favorite
        this.props.navigation.setOptions({ 
            headerRight: () => (
                <Icon
                    onPress={() => this.toogleFavorite()}
                    name={this.state.isFavorite ? "heart" : "heart-o"}
                    backgroundColor="transparent"
                    color="black"
                    style={styles.headButton}
                />  
            )
        })
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
        this.props.navigation.setOptions({ 
            title: character.name,
            headerRight: () => (
                <Icon
                    onPress={() => this.toogleFavorite()}
                    name={this.state.isFavorite?"heart":"heart-o"}
                    backgroundColor="transparent"
                    color="black"
                    style={styles.headButton}
                />  
            )
        })
        this.setState({character:character, location:character.location, origin:character.origin, episodes:character.episodes}, () => {
            this.getFavorite()
        })
    }
    
    statusSwitch(status){
        switch(status) {
        case 'Alive':
            return '#55CC44';
        case 'Dead':
            return '#D63D2E' ;   
        case 'unknown':
            return '#9E9E9E';           
        default:
            return 'transparent';
        }
    }

    componentDidMount(){
        this.getCharacter()
    }

    render() {
        const {isFavorite, character, location,origin, episodes} = this.state
        
        return (
            <ScrollView>
                <View style={styles.container}>
                    
                        <Image
                            style={styles.image}
                            source={{ uri: character.image }}
                        />
                
                        <View>
                            <Text style={styles.text}>Status: {character.status}  <DotIcon name='primitive-dot' backgroundColor="transparent" color={this.statusSwitch(character.status)} style={{fontSize:20}}/></Text>
                            <Text style={styles.text}>Species: {character.species} </Text>
                            {character.type == "" ?
                                null
                                :<Text style={styles.text}>Type: {character.type} </Text> 
                            }
                            <Text style={styles.text}>Gender: {character.gender} </Text>
                            <Text style={styles.text}>Origin: {origin.name} </Text>
                            <Text style={styles.text}>Location: {location.name} </Text>
                        </View>
                </View>
            </ScrollView>
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
    headButton:{
       backgroundColor:"transparent",
       fontSize:25,
       marginRight:10
    },
    text:{
        fontFamily:"Segoe UI",
        fontSize:17,
        marginVertical:3,
        marginHorizontal:15
    }
})

export default CharcaterDetail
