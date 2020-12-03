import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainStack from 'Rick_and_Morty_Api/src/components/main/MainStack';
import FavoritesStack from 'Rick_and_Morty_Api/src/components/favorites/FavoritesStack'

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
  <Tabs.Screen name='main' component={MainStack}/>

  <Tabs.Screen
    name='favorites' component={FavoritesStack}
  />
      </Tabs.Navigator>
      
  
    </NavigationContainer>
  )
};


export default App;