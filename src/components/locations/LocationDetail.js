import React, { Component } from 'react'
import {View, Text,StyleSheet,ScrollView,FlatList,ActivityIndicator } from 'react-native'
import CharacterItem from '../items/CharacterItem'
import Http from 'Rick_and_Morty_Api/src/libs/http'


export class LocationDetail extends Component {
    state = {
        location:{},
        residents:[],
        loading:true
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
            var count = 0
            if (citizen.length == 0) {
                this.setState({location:location ,residents: residents, loading:false})
                resolve()
            } else {
                citizen.forEach(async element => {
                    const response =  await Http.instance.get(element)
                    residents.push(response)
                    count ++
                    if(citizen.length == count ){
                        this.setState({location:location ,residents: residents, loading:false})
                        resolve()
                    }
                })
            }      
        })
        getResidents
    }

    getCharacter = async (character) => {
        const response =  await Http.instance.get(character)//asta aqui funciona
        //console.log(response)
        return response
    }


    handlePress = (character) =>{
        this.props.navigation.navigate('CharacterDetail',{character})
    }    

    componentDidMount(){
        this.getLocation()
    }

    render() {
        const {location,residents,loading} = this.state
        
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
                                <Text style={styles.text}>Residents:</Text>
                                <FlatList 
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginLeft:15}}
                                    horizontal={true}
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