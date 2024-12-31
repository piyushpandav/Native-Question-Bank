import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import First from './First';
import Catagory from './Catagory';
import SubCatagory from './SubCatagory';
import Addquestion from './Addquestion'
import Question from './Question'
import Loader from './Loader';

export default function Home() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName='Question'>
      
        <Drawer.Screen name='Home' component={First} />
        <Drawer.Screen name='Category' component={Catagory} />
        <Drawer.Screen name='SubCatagory' component={SubCatagory} />
        <Drawer.Screen name='Addquestion' component={Addquestion} />
        <Drawer.Screen name='Question' component={Question} />
        <Drawer.Screen name='Loading' component={Loader} />

   
    </Drawer.Navigator>


  )
}