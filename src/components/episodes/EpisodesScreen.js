import React, { Component } from 'react'

import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native'
import Http from 'Rick_and_Morty_Api/src/libs/http'
import SecondItem from '../items/SecondItem'


export class EpisodesScreen extends Component {

    state = {
        episodes:[],
        loading: false,
        loadingMore:false,
        page:0,
        quantityOfPages:0,
        error:false
    }

    getEpisodes = async () => {
        try {
            this.setState({loading:true})
            const res = await Http.instance.get("https://rickandmortyapi.com/api/episode")
            this.setState({episodes : res.results, loading:false, page: 2, quantityOfPages: res.info.pages})
        } catch (error) {
            this.setState({error:true,loading:false})
        }
    }

    //navigate to episode detail
    handlePress = (episode) =>{
        this.props.navigation.navigate('EpisodeDetail',{episode})
    }

    handleLoadMore = async () => {
        if (this.state.loadingMore) {
            return null 
        }else{
            var page = this.state.page
            try {
                if ((page - 1) == this.state.quantityOfPages) {
                    return null 
                } else {
                    this.setState({loadingMore: true})
                    const res = await Http.instance.get('https://rickandmortyapi.com/api/episode?page=' + page.toString())
                    page ++
                    const plusNewEpisodes = this.state.episodes.concat(res.results)
                    this.setState({episodes:plusNewEpisodes, page:page, loadingMore:false})
                }
            } catch (error) {
                this.setState({loadingMore: false, error: true})
                console.log(error)
            }
        }
    }

    componentDidMount(){
        this.getEpisodes()
    }

    render() {
        const {episodes, loading, loadingMore, error} = this.state
        return (
            <View style={styles.container}>
                {loading 
                    ? <ActivityIndicator color="blue" size="large"/>
                    :null
                }
                 <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={episodes}
                    initialNumToRender={20}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <SecondItem 
                            onPress={() => this.handlePress(item)} 
                            item={item}
                        />
                    }
                />
                {loadingMore 
                    ?<ActivityIndicator color="white" size="large"/>
                    :null
                }
                {error 
                    ?<Pressable onPress={this.getEpisodes}>
                        <Icon
                            name='reload'
                            backgroundColor="transparent"
                            color="black"
                            style={{fontSize:35,marginTop:40}}
                        />
                    </Pressable>
                    :null
                }
            
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        alignItems:"center"
    }
})

export default EpisodesScreen