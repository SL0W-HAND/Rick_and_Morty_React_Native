import React, { Component } from 'react';
import{View, Text, Pressable, StyleSheet, Image} from'react-native';
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient


const CharacterItem = ({item, onPress}) => {  
    return (
        <Pressable  onPress={onPress} style={styles.card}>
           
            <Image
                style={styles.image}
                source={{
                    uri: item.image,
                  }}
            />
            <LinearGradient
          colors={['transparent','black' ]}
          style={styles.linearGradient}
        ></LinearGradient>
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
       height:145,
       borderRadius:17
    },
    text:{
        position:"absolute",
        bottom:8,
        left:5,
        color:"white",
        fontWeight:"bold",
        fontFamily:"Segoe UI"
    },
    linearGradient: {
        position:"absolute",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 17,
        borderBottomRightRadius:17,
        height: 60,
        width: 145,
      }
})

export default CharacterItem
