import { View,ActivityIndicator, Text } from 'react-native'
import React from 'react'

export default function Loader() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
      <ActivityIndicator size='large' color='black'/>
    </View>
  )
}