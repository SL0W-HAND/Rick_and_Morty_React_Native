import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavoritesScreen from './FavoritesScreen'

const Stack =  createStackNavigator()


const FavoritesStack = () => {
    
        return (
            <Stack.Navigator>
                <Stack.Screen name='favotites'
                component={FavoritesScreen}/>
            </Stack.Navigator>
        )
    
}

export default FavoritesStack
