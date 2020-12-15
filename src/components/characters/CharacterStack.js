import React, { Component } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import CharacterScreen from './CharacterScreen'
import CharacterDetail from './CharacterDetail'

const Stack =  createStackNavigator()

const CharacterStack = () => {
 return(
     <Stack.Navigator>
        <Stack.Screen name='Characters' component={CharacterScreen}/>
        <Stack.Screen name='CharacterDetail'  component={CharacterDetail}/>
     </Stack.Navigator>
 )
}

export default CharacterStack
