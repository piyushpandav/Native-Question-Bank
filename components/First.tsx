import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function First() {
  return (
    <SafeAreaView style={styles.container}>

      <View>

        <View style={{ alignItems: 'center', }}>
          <Image source={require('@/assets/images/ho.jpg.png')} style={styles.img} />
        </View>
      </View>
      <View>
        <Text style={styles.title}>Welcome To Home Page!</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  img: {
    width: 500,
    // height:700,

    // marginBottom: 60,
  },
  title: {
    fontSize: 38,
    textAlign: 'center',
    marginVertical: 20,

  },
})