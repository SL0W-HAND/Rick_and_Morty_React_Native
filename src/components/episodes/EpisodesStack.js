import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import EpisodesScreen from './EpisodesScreen'
import EpisodeDetail from './EpisodeDetail'
import CharacterDetail from '../characters/CharacterDetail'

const Stack =  createStackNavigator()

const EpisodesStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Episodes' component={EpisodesScreen}/>
            <Stack.Screen name='EpisodeDetail' component={EpisodeDetail}/>
            <Stack.Screen name='CharacterDetail'  component={CharacterDetail}/>
        </Stack.Navigator>
    )
}

export default EpisodesStack