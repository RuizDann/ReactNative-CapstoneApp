import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen.js';
import NewMatch from './components/NewMatch.js';
import EventPage from './components/EventPage.js';
import MatchDataHomeScreen from'./components/MatchDataHomeScreen.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{title: 'Wrestling Statistics',
         headerStyle: {backgroundColor: '#4F5D75'},
         headerTintColor: 'white',
         headerTitleStyle: {fontWeight: 'bold'},}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="NewMatch" component={NewMatch} options={{title: "Create Match"}}/>
        <Stack.Screen name="EventPage" component={EventPage}/>
        <Stack.Screen name="MatchDataHomeScreen" component={MatchDataHomeScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;