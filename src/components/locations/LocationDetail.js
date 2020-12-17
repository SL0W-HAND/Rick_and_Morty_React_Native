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
        this.props.navigation.setOptions({ 
            title: location.name,
        }) 

        var residentes = location.residents
       

        var test = await new Promise((resolve, reject) => {

            var residents =[]
            var count = 0
            if (residentes.length == 0) {
                this.setState({location:location ,residents: residents, loading:false})
                resolve()
            } else {
                residentes.forEach(async element => {
                    const response =  await Http.instance.get(element)
                    residents.push(response)
                    count ++
                    if(residentes.length == count ){
                        this.setState({location:location ,residents: residents, loading:false})
                        resolve()
                    }
                })
            }      
        })
        test
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
            <View>

                {loading?
                 <ActivityIndicator color="blue" size="large"/>
                 :
                 <ScrollView>
                    <Text>Type: {location.type}</Text>
                    <Text>Dimension: {location.dimension}</Text>
                    {residents.length == 0?
                        <Text>Nobody lives here</Text>
                    :
                        <FlatList 
                            showsHorizontalScrollIndicator={false}
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
                    }  
                </ScrollView>
                     
                }
               

                </View>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        maxHeight:300
    }
})

export default LocationDetail
/*
<FlatList 
                     
                     data={residents}
                     keyExtractor={item => item.id.toString()}
                     renderItem={({ item }) =>
                         <CharacterItem 
                             onPress={() => this.handlePress(item)} 
                             item={item}
                         />
                     }

                    
                 />
*/