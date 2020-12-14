import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CharacterStack from 'Rick_and_Morty_Api/src/components/characters/CharacterStack';
import FavoritesStack from 'Rick_and_Morty_Api/src/components/favorites/FavoritesStack';
import {Image} from 'react-native';

const Tabs = createBottomTabNavigator();
//npx react-native run-android
const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator tabBarOptions={{
          showLabel: false,
          tintColor: "red"
        }}>
        <Tabs.Screen 
          name='main' 
          component={CharacterStack} 
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{  width:20, height:20}}
                source={require('Rick_and_Morty_Api/src/assets/characters.png')}
              />
            )
          }}
        />

        <Tabs.Screen 
          name='favorites' 
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{  width:20, height:20}}
                source={require('Rick_and_Morty_Api/src/assets/favorites.png')}
              />
            )
          }}
        />

      </Tabs.Navigator>
    </NavigationContainer>
  )
};


export default App;