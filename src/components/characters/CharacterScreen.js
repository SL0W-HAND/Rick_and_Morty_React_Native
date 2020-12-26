import React, { Component } from 'react'
import {View,Text, Pressable, FlatList, ActivityIndicator, StyleSheet} from 'react-native'
import Http from 'Rick_and_Morty_Api/src/libs/http'
import CharacterItem from '../items/CharacterItem'

export class CharacterScreen extends Component {
  
    state = {
        characters:[],
        loading: false,
        loadingMore: false,
        fetchIndex:0,
        pagesNumbers:[],
        refreshing:false
    }
    //get initial characters
    getCharacters = async() => {

        //get the number of pages 
        const info = await Http.instance.get("https://rickandmortyapi.com/api/character")
        const quantityOfPages = info.info.pages

        //into pagesNumbers array push every number of page for later request
        for (var i = 1 ; i <= quantityOfPages ; i++) {
            this.state.pagesNumbers.push(i)
        }

        //shuffle the array pageNumbers
        this.setState({pageNumbers : this.shuffle(this.state.pagesNumbers)})

        //request to the page in the first index of pageNumbers
        this.setState({loading:true})
        const pageFetch = this.state.pagesNumbers[0]
        const res = await Http.instance.get('https://rickandmortyapi.com/api/character/?page=' + pageFetch.toString())
        this.setState({characters : res.results, loading:false})
    }

    componentDidMount = () => {
        this.getCharacters()
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    } 

    //navigate to detail of character
    handlePress = (character) =>{
        this.props.navigation.navigate('CharacterDetail',{character})
    }

    handleLoadMore =  async () => {

        if (this.state.loadingMore) {
            return null 
        }else{
            var count = this.state.fetchIndex
            count ++
            this.setState({fetchIndex: count})
            if (count == this.state.pagesNumbers.length) {
                return null
            } else {
                this.setState({loadingMore:true})
                const pageFetch = this.state.pagesNumbers[count] //number of the next page for request
                const res = await Http.instance.get('https://rickandmortyapi.com/api/character/?page=' + pageFetch.toString())
                const plusNewCharacters = this.state.characters.concat(res.results) 
                this.setState({characters: plusNewCharacters , loadingMore: false, fetchIndex: count})
            } 
        }
    }

    handleRefresh = () => {
        this.setState({fetchIndex: 0, refreshing: true})
        this.getCharacters()
        .then(this.setState({ refreshing: false}))
    }

    render() {
        const {characters, loading, loadingMore} = this.state
        return (
            <View style={styles.container}>
                {loading 
                    ? <ActivityIndicator color="white" size="large"/>
                    :null
                }
                <FlatList 
                    numColumns={2}
                    showsVerticalScrollIndicator ={false}
                    data={characters}
                    initialNumToRender={20}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <CharacterItem 
                            onPress={() => this.handlePress(item)} 
                            item={item}
                        />
                    }
                />
                {loadingMore 
                    ? <ActivityIndicator color="blue" size="large"/>
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

export default CharacterScreen