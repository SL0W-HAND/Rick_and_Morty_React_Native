import React, { Component } from 'react'
import{View, Text, Pressable} from'react-native'
const PersonageDetail = (item) => {
    
    var character = item.item
        return (
            <View>
                <Text>
                    {character.name}
                </Text>
                <Text>
                {character.status}
                </Text>
            </View>
        )
    
}

export default PersonageDetail
