import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from './MainScreen'
import CharacterDetail from './CharacterDetail'

const Stack =  createStackNavigator()

const MainStack = () => {
 return(
     <Stack.Navigator>
        <Stack.Screen name='personage' component={MainScreen}/>
        <Stack.Screen name='CharacterDetail'  component={CharacterDetail}/>
     </Stack.Navigator>
 )
}



export default MainStack
