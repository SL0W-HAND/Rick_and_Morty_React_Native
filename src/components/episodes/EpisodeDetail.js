import React, { Component } from 'react'
import {View, ActivityIndicator,ScrollView, StyleSheet,Text,FlatList} from 'react-native'
import CharacterItem from '../items/CharacterItem'
import Http from 'Rick_and_Morty_Api/src/libs/http'
import RequestStack from 'Rick_and_Morty_Api/src/libs/request_stack'


export class EpisodeDetail extends Component {
    state ={
        episode:{},
        characters:[],
        charactersUrls:[],
        loadingMore:false,
        index:1,
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
            var charactersUrls = []
            var count = 0
            if (characters.length == 0) {
                this.setState({episode:episode,characters:charactersDone,loading:false})
            } else {
                charactersUrls = RequestStack.instance.arrayTo2DArray2(characters, 15)
                
                this.setState({charactersUrls:charactersUrls})
                charactersUrls[0].forEach(async element => {

                    const response = await Http.instance.get(element)
                    
                    charactersDone.push(response)
                    
                    count ++

                    if (charactersUrls[0].length == count) {
                        this.setState({episode:episode, characters:charactersDone, loading:false})
                        resolve()
                    }
                })
            }
        })
        try {
            getCharacters
        } catch (error) {
            //go back
        }
        
    }

    handlePress = (character) =>{
        this.props.navigation.navigate('CharacterDetail',{character})
    } 

    handleLoadMore = async () => {
        if (this.state.loadingMore == false) {
            var index = this.state.index
            
            if (this.state.charactersUrls.length > index) {
                this.setState({loadingMore: true})

                var loadMore = new Promise((resolve,reject) => {
                    var newCharacters = []
                    var count = 0

                    this.state.charactersUrls[index].forEach(async element => {

                        const response =  await Http.instance.get(element)

                        newCharacters.push(response)

                        count ++

                        if (this.state.charactersUrls[index].length == count) {
                            var plusNewCharacters = this.state.characters.concat(newCharacters)
                            this.setState({index: (index + 1), characters: plusNewCharacters, loadingMore: false})
                            resolve()
                        }
                        
                    })
                })

                loadMore

            } else {
                return null
            }
        }
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
                            color="#FF9800" 
                            style={styles.loader}
                            size="large"
                        />
                    :<ScrollView>
                            <Text style={styles.text}>Air date: {episode.air_date}</Text>
                            <Text style={styles.text}>Season: {episode.episode.substr(1,2)}</Text>
                            <Text style={styles.text}>Episode: {episode.episode.substr(4)}</Text>
                            <Text style={styles.text}>Characters on this episode:</Text>
                            <FlatList 
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginLeft:15}}
                                    horizontal={true}
                                    onEndReached={this.handleLoadMore}
                                    onEndReachedThreshold={0.5}
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
    loader:{
        marginTop:150
    },
    text:{
        fontFamily:"Segoe UI",
        fontSize:17,
        marginLeft:15,
        marginVertical:7
    }
})

export default EpisodeDetail
