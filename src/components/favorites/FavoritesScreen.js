import React, { Component } from 'react'
import {View, Text, FlatList} from 'react-native'
import Storage from 'Rick_and_Morty_Api/src/libs/storage'
import FavoriteEmpty from './FavoriteEmpty'
import CharacterItem from '../items/CharacterItem'


export class FavoritesScreen extends Component {

    state = {
        favorites: []
      }

    getFavorites = async () => {
        try {
          const allKeys = await Storage.instance.getAllkeys();
    
          const keys = allKeys.filter((key) => key.includes("favorite-"));
    
          const favs = await Storage.instance.multiGet(keys);
    
          const favorites = favs.map((fav) => JSON.parse(fav[1]));
    
          this.setState({ favorites });
    
        } catch (err) {
          console.log("get favorites err", err);
        }
    }

     componentDidMount(){
      this.props.navigation.addListener("focus", this.getFavorites);
    }

    componentWillUnmount() {
      this.props.navigation.removeListener("focus", this.getFavorites);
    }

    handlePress = (character) =>{
      this.props.navigation.navigate('CharacterDetail',{character})
    }

    render() {

        const {favorites} = this.state

        return (
            <View>
                {favorites.length == 0 ? <FavoriteEmpty/> : null }
                <FlatList 
                    showsVerticalScrollIndicator ={false}
                    numColumns={2}
                    data={favorites}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <CharacterItem 
                            onPress={() => this.handlePress(item)} 
                            item={item}
                        />
                    }
                />
            </View>
        )
    }
}

export default FavoritesScreen