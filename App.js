import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CharacterStack from 'Rick_and_Morty_Api/src/components/characters/CharacterStack';
import LocationStack from 'Rick_and_Morty_Api/src/components/locations/LocationStack';
import FavoritesStack from 'Rick_and_Morty_Api/src/components/favorites/FavoritesStack';
import EpisodesStack from 'Rick_and_Morty_Api/src/components/episodes/EpisodesStack'
//import {Image} from 'react-native';
import Svg, {Image} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator tabBarOptions={{
          showLabel: false
        }}>
        <Tabs.Screen 
          name='main' 
          component={CharacterStack} 
          options={{
            tabBarIcon: ({ focused }) => (
              <Svg width="20" height="20">
                <Image 
                  href={focused ? require('Rick_and_Morty_Api/src/assets/vectorpaint.svg') : require('Rick_and_Morty_Api/src/assets/vectorpaint.svg')}
                />
              </Svg> 
            )
          }}
        />

        <Tabs.Screen
          name='location'
          component={LocationStack}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name='planet-outline'
                backgroundColor="transparent"
                color={focused ? "#FF9800" : "black"}
                style={{fontSize:20, fontWeight:'bold'}}
              />
            )
          }}
        />

        <Tabs.Screen
          name='Episodes'
          component={EpisodesStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name='film-outline'
                backgroundColor="transparent"
                color={focused ? "#FF9800" : "black"}
                style={{fontSize:20, fontWeight:'bold'}}
              />
            )
          }}
        />

        <Tabs.Screen 
          name='favorites' 
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name='bookmarks-outline'
                backgroundColor="transparent"
                color={focused ? "#FF9800" : "black"}
                style={{fontSize:20}}
              />
            )
          }}
        />

      </Tabs.Navigator>
    </NavigationContainer>
  )
};


export default App;