// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './component/HomeScreen'; // Assuming your components are in a 'component' folder
import LoginSignupScreen from './component/loginscreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Hides the default navigation bar on the Home screen
        />
        <Stack.Screen 
          name="LoginSignup" 
          component={LoginSignupScreen} 
          options={{ title: 'Welcome' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}