import React, { Component } from 'react'
import {View, FlatList, ActivityIndicator, StyleSheet,Pressable} from 'react-native'
import Http from 'Rick_and_Morty_Api/src/libs/http'
import SecondItem from '../items/SecondItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export class LocationScreen extends Component {
  
    state = {
        locations:[],
        loading: false,
        loadingMore:false,
        page:0,
        quantityOfPages:0,
        error:false
    }
    
    getLocations = async () => {
        try {
            this.setState({loading:true})
            const res = await Http.instance.get("https://rickandmortyapi.com/api/location")
            this.setState({locations : res.results, loading:false, page: 2, quantityOfPages: res.info.pages})
        } catch (error) {
            this.setState({error:true,loading:false})
        }
    }

    handlePress = (location) =>{
        this.props.navigation.navigate('LocationDetail',{location})
    }

    handleLoadMore = async () =>{
        if (this.state.loadingMore) {
            return null 
        }else{
            var page = this.state.page
            try {
                if ((page - 1) == this.state.quantityOfPages) {
                    return null 
                } else {
                    this.setState({loadingMore: true})
                    const res = await Http.instance.get('https://rickandmortyapi.com/api/location?page=' + page.toString())
                    page ++
                    const plusNewLocations = this.state.locations.concat(res.results)
                    this.setState({locations:plusNewLocations, page:page, loadingMore:false})
                }
            } catch (error) {
                this.setState({loadingMore: false, error: true})
            }
        }
    }

    componentDidMount =() =>{
        this.getLocations()
    }

    render() {
        const {locations, loading, error, loadingMore} = this.state
        return (
            <View style={styles.container}>
                {loading 
                    ?<ActivityIndicator color="white" size="large"/>
                    :null
                }
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={locations}
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
                    ?<Pressable onPress={this.getLocations}>
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

export default LocationScreen