import React, { Component } from 'react'
import {View, ActivityIndicator,ScrollView, StyleSheet,Text,FlatList} from 'react-native'
import CharacterItem from '../items/CharacterItem'
import Http from 'Rick_and_Morty_Api/src/libs/http'


export class EpisodeDetail extends Component {
    state ={
        episode:{},
        characters:[],
        loading:true
    }

    getEpisode = async() => {
        const episode = this.props.route.params.episode
        //header title with the name of the parameter when is press on the episodes screen
        this.props.navigation.setOptions({ 
            title: episode.name,
        }) 
        var characters = episode.characters

        var getCharacters = await new Promise((resolve,reject) => {
            var charactersDone = []
            var count = 0
            if (characters.length == 0) {
                this.setState({episode:episode,characters:charactersDone,loading:false})
            } else {
                characters.forEach(async element => {
                    const response = await Http.instance.get(element)
                    charactersDone.push(response)
                    count ++
                    if (characters.length == count) {
                        this.setState({episode:episode, characters:charactersDone, loading:false})
                        resolve()
                    }
                })
            }
        })
        getCharacters
    }

    handlePress = (character) =>{
        this.props.navigation.navigate('CharacterDetail',{character})
    } 

    componentDidMount(){
        this.getEpisode()
    }

    render() {
        const {episode,characters,loading} = this.state

        return (
            <View>
               {loading
                    ?<ActivityIndicator 
                            
                            color="blue" 
                            size="large"
                        />
                    :<ScrollView>
                            <Text>Air date {episode.air_date}</Text>
                            <Text>Episode {episode.episode}</Text>
                            <Text>Characters on this episode</Text>
                            <FlatList 
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginLeft:15}}
                                    horizontal={true}
                                    data={characters}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({ item }) =>
                                        <CharacterItem 
                                            onPress={() => this.handlePress(item)} 
                                            item={item}
                                        />
                                    }
                                />
                     </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default EpisodeDetail
