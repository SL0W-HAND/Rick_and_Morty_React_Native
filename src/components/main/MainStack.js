import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from './MainScreen'
import PersonageDetails from '../personage/PersonageDetail'

const Stack =  createStackNavigator()

const MainStack = () => {
 return(
     <Stack.Navigator>
        <Stack.Screen name='personage' component={MainScreen}/>
        <Stack.Screen name='Personage Detail' component={PersonageDetails}/>
     </Stack.Navigator>
 )
}



export default MainStack
