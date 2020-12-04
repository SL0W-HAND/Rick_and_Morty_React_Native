import React, { Component } from 'react';
import{View, Text, Pressable} from'react-native';

const CharacterItem = ({item, onPress}) => {  
    return (
        <Pressable onPress={onPress}>
            <Text>
                {item.name}
            </Text>
            <Text>
                {item.status}
            </Text>
        </Pressable>
    )
}

export default CharacterItem
