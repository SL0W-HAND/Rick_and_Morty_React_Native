import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainStack from 'Rick_and_Morty_Api/src/components/main/MainStack'

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
  <Tabs.Screen name='main' component={MainStack}/>
      </Tabs.Navigator>
      
    </NavigationContainer>
  )
};


export default App;
