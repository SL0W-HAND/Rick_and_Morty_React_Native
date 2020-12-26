import React, { Component } from 'react'

import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native'
import Http from 'Rick_and_Morty_Api/src/libs/http'
import SecondItem from '../items/SecondItem'


export class EpisodesScreen extends Component {

    state = {
        episodes:[],
        loading: false
    }

    //get episodes
    componentDidMount = async () => {
        this.setState({loading:true})
        const res = await Http.instance.get("https://rickandmortyapi.com/api/episode")
        this.setState({episodes : res.results, loading:false})
    }

    //navigate to episode detail
    handlePress = (episode) =>{
        this.props.navigation.navigate('EpisodeDetail',{episode})
    }

    render() {
        const {episodes, loading} = this.state
        return (
            <View>
                {loading 
                    ? <ActivityIndicator color="blue" size="large"/>
                    :null
                }
                 <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={episodes}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <SecondItem 
                            onPress={() => this.handlePress(item)} 
                            item={item}
                        />
                    }
                />
            
            </View>
        )
    }
}

export default EpisodesScreen
