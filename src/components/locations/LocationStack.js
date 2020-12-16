import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import LocationScreen from './LocationScreen'
import LocationDetail from './LocationDetail'

const Stack =  createStackNavigator()

const LocationStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Locations' component={LocationScreen}/>
            <Stack.Screen name='LocationDetail'  component={LocationDetail}/>
        </Stack.Navigator>
    )
}

export default LocationStack
