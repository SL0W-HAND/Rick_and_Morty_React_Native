import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const FavoriteEmpty = () => {
    return (
    <View style={styles.container}>
        <Text style={styles.text}>
            You don't have anything here
        </Text>
    </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingTop:70
    },
    text:{
        fontFamily:"Segoe UI",
        fontSize:20
    }
})

export default FavoriteEmpty