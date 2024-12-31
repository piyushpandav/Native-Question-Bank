import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Addquestion() {
  return (
    <View style={style.containar}>
    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

      <TextInput
        placeholder='Search'
        style={style.input}
        placeholderTextColor='black'
      />
      <TouchableOpacity>

        <Ionicons name="add-circle" size={40} color="black" />
      </TouchableOpacity>
    </View>
  </View>
  )
}
const style = StyleSheet.create({
  containar: {
    flex: 1,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aca5a5",
    paddingVertical: 10,
    borderRadius: 10,
    color: "#000",
    paddingHorizontal: 15,
    width:"90%",
  }
})