import React from 'react';
import{ Text, Pressable,View, StyleSheet} from'react-native';

const secondItem = ({item, onPress}) => {
    return (
        <Pressable  onPress={onPress}>   
            <View style={styles.card}>
                <Text style={styles.text}>{item.name}</Text>
                {item.type
                    ?<Text>      {item.type}</Text>
                    :false
                }
            </View>    
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card:{
        borderWidth:1,
        borderColor:'#C0C4C8',
        borderRadius:20,
        marginVertical:5,
        paddingLeft:10,
        paddingVertical:10,
        width:300
    },
    text:{
        fontFamily:"Segoe UI",
        fontSize:20

    }
})
export default secondItem
