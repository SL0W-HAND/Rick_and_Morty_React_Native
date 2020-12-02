import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from 'Rick_and_Morty_Api/src/components/main/MainStack'

const App = () => {
  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  )
};


export default App;
