import React, { Component } from 'react';
import{View, Text, Pressable, StyleSheet, Image} from'react-native';

const CharacterItem = ({item, onPress}) => {  
    return (
        <Pressable  onPress={onPress} style={styles.card}>
           
            <Image
                style={styles.image}
                source={{
                    uri: item.image,
                  }}
            />
            <Text style={styles.text}>
                {item.name}
            </Text>
            
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end",
        marginVertical:"3%",
        marginHorizontal:"1.2%",
        width:145,
        position:"relative",
        borderRadius:50
        
    },
    image:{
       width:145,
       height:145
    },
    text:{
        position:"absolute",
        bottom:8,
        left:4,
        color:"white",
        fontWeight:"bold",
        fontFamily:"Segoe UI"
    }
})

export default CharacterItem
