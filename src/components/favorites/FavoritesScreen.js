import React, { Component } from 'react'
import {View, Text, FlatList} from 'react-native'
import Storage from 'Rick_and_Morty_Api/src/libs/storage'
import FavoriteEmpty from './FavoriteEmpty'


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
    
         // console.log("favs", favorites);
    
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
    render() {

        const {favorites} = this.state

        console.log(favorites.length)
        return (
            <View>
                {favorites.length == 0 ? <FavoriteEmpty/> : null }

            

                <Text>
                    jjfjjf
                </Text>
            </View>
        )
    }
}

export default FavoritesScreen
