import React, { Component } from 'react'
import {View, Text,StyleSheet,ScrollView,FlatList,ActivityIndicator } from 'react-native'
import CharacterItem from '../items/CharacterItem'
import Http from 'Rick_and_Morty_Api/src/libs/http'
import RequestStack from 'Rick_and_Morty_Api/src/libs/request_stack'


export class LocationDetail extends Component {
    state = {
        location:{},
        residents:[],
        residentsUrls:[],
        numOfResidents:0,
        loading:true,
        loadingMore:false,
        index:1
    }

    getLocation = async() => {
        const location = this.props.route.params.location
        //header title with the name of the parameter when is press on the location screen
        this.props.navigation.setOptions({ 
            title: location.name,
        }) 

        var citizen = location.residents
       
        var getResidents = await new Promise((resolve, reject) => {

            var residents = []
            var residentsUrls = []
            var count = 0
            if (citizen.length == 0) {
                this.setState({location:location ,residents: residents, loading:false})
                resolve()
            } else {
                residentsUrls = RequestStack.instance.arrayTo2DArray2(citizen, 15)

                this.setState({residentsUrls:residentsUrls, numOfResidents: citizen.length})

                residentsUrls[0].forEach(async element => {

                    const response =  await Http.instance.get(element)

                    residents.push(response)

                    count ++

                    if(residentsUrls[0].length == count ){
                        this.setState({location:location ,residents: residents, loading:false})
                        resolve()
                    }
                })
            }      
        })
        try {
            getResidents
        } catch (error) {
            //go back
        }
        
    }

    getCharacter = async (character) => {
        const response =  await Http.instance.get(character)
        return response
    }


    handlePress = (character) =>{
        this.props.navigation.navigate('CharacterDetail',{character})
    }
    
    handleLoadMore = async () => {
        if (this.state.loadingMore == false) {
            var index = this.state.index
            
            if (this.state.residentsUrls.length > index) {
                this.setState({loadingMore:true})
                var loadMore = new Promise((resolve,reject) => {
                    var newCharacters = []
                    var count = 0
                   
                    this.state.residentsUrls[index].forEach(async element => {

                        const response =  await Http.instance.get(element)

                        newCharacters.push(response)

                        count ++

                        if (this.state.residentsUrls[index].length == count) {     
                            var plusNewCharacters = this.state.residents.concat(newCharacters)
                            this.setState({index: (index + 1), residents: plusNewCharacters, loadingMore: false})
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
        this.getLocation()
    }

    render() {
        const {location,residents,loading,numOfResidents} = this.state
        
        return (
            <View style={styles.container}>

                {loading
                    ?<ActivityIndicator 
                            style={styles.loader} 
                            color="blue" 
                            size="large"
                     />
                    :<ScrollView>
                        <Text style={styles.text}>Type: {location.type}</Text>
                        <Text style={styles.text}>Dimension: {location.dimension}</Text>
                        {residents.length == 0
                            ?<Text style={styles.text}>Nobody lives here</Text>
                            :<View>
                                <Text style={styles.text}>Residents: {numOfResidents}</Text>
                                <FlatList 
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginLeft:15}}
                                    horizontal={true}
                                    onEndReached={this.handleLoadMore}
                                    onEndReachedThreshold={0.5}
                                    data={residents}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({ item }) =>
                                        <CharacterItem 
                                            onPress={() => this.handlePress(item)} 
                                            item={item}
                                        />
                                    }
                                />
                            </View>
                        }
                        <Text style={styles.footer}>Created: {location.created}</Text>  
                    </ScrollView>     
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    loader:{
        marginTop:150
    },
    text:{
        fontFamily:"Segoe UI",
        fontSize:17,
        marginLeft:15,
        marginVertical:7
    },
    footer:{
        position:'relative',
        marginTop:60,
        fontFamily:"Segoe UI",
        fontSize:15,
        marginLeft:15,
    }
})

export default LocationDetail