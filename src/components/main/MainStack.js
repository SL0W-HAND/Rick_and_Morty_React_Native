import React, { Component } from 'react'
import {Image} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from './MainScreen'
import CharacterDetail from '../characters/CharacterDetail'

const Stack =  createStackNavigator()

const MainStack = () => {
 return(
     <Stack.Navigator>
        <Stack.Screen name='Characters' component={MainScreen}/>
        <Stack.Screen name='CharacterDetail'  component={CharacterDetail}/>
     </Stack.Navigator>
 )
}



export default MainStack
