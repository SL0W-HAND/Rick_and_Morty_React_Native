import React from 'react';
import{ Text, Pressable,View} from'react-native';

const secondItem = ({item, onPress}) => {
    return (
        <Pressable  onPress={onPress}>   
        <View>
            <Text>{item.name}</Text>
            </View>    
        </Pressable>
    )
}

export default secondItem
