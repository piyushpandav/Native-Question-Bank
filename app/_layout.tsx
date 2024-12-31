import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


import { useColorScheme } from '@/hooks/useColorScheme';

import Home from '@/components/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '@/components/Login';
import Welcome from '@/components/Welcome';
import SingUp from '@/components/SingUp';



export default function RootLayout() {

  const navigation = useNavigation();

  const [user,setUser] = useState("");





  const Stack = createStackNavigator();
  const getdata= async()=>{
      const data = await AsyncStorage.getItem('User')
      const users = JSON.parse(data)
      if(users.data){
        navigation.navigate('Home')
      }
      setUser(users.data)
  }

  useEffect(()=>{
    getdata();
    // AsyncStorage.clear() 
  },[])
  return (
  //  <NavigationContainer >
    <Stack.Navigator initialRouteName={'Welcome'}>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="SingUp" component={SingUp} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
    </Stack.Navigator>

    
  );
}
