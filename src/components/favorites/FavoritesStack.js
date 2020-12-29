import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavoritesScreen from './FavoritesScreen'
import CharacterDetail from '../characters/CharacterDetail'

const Stack =  createStackNavigator()


const FavoritesStack = () => {
    
        return (
            <Stack.Navigator>

                <Stack.Screen 
                    name='favorites'
                    component={FavoritesScreen}
                />
                <Stack.Screen
                    name='CharacterDetail'
                    component={CharacterDetail}
                />
            </Stack.Navigator>
        )
    
}

export default FavoritesStack
