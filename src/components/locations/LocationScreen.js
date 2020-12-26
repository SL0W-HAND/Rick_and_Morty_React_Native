import React, { Component } from 'react'
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native'
import Http from 'Rick_and_Morty_Api/src/libs/http'
import SecondItem from '../items/SecondItem'

export class LocationScreen extends Component {
  
    state = {
        locations:[],
        loading: false
    }
    // get locations
    componentDidMount = async () => {
        this.setState({loading:true})
        const res = await Http.instance.get("https://rickandmortyapi.com/api/location")
        this.setState({locations : res.results, loading:false})
    }

    handlePress = (location) =>{
        this.props.navigation.navigate('LocationDetail',{location})
    }

    render() {
        const {locations, loading} = this.state
        return (
            <View style={styles.container}>
                {loading 
                    ?<ActivityIndicator color="white" size="large"/>
                    :null
                }
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={locations}
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

const styles = StyleSheet.create({
    container:{
        alignItems:"center"
    }
})

export default LocationScreen
