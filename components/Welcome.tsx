import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Animated, {Animation, FadeInRight, FadeInUp} from 'react-native-reanimated'

export default function Welcome() {

    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInRight.delay(300).duration(600)}>
        <Animated.Text entering={FadeInUp.delay(200).duration(500)} style={styles.title}>Welcome</Animated.Text>
            <View style={{alignItems:'center',}}>
            <Image source={require('@/assets/images/Welcome.jpg.png')}style={styles.img}/>
            </View>
            
            <View style={styles.MainBtn}>

            <TouchableOpacity style={styles.BTN} onPress={()=>navigation.navigate('SingUp')} >
                <Text style={styles.text}>Sing Up</Text>
            </TouchableOpacity>
                
            <TouchableOpacity style={styles.BTN} onPress={()=>navigation.navigate('Login')} >
                <Text  style={styles.text}>Login</Text>
            </TouchableOpacity>
            </View>
        </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#62c5ec',
        padding:15,
    },
    title:{
        fontSize:50,
        textAlign:'center',
        marginVertical:15,
        
    },
    img:{
        width:200,
       marginBottom:60,
    },
    MainBtn:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    BTN:{
      backgroundColor:'#ebd939', 
      paddingHorizontal:45,
      paddingVertical:20,
      borderRadius:50,
    },
    text:{
        fontSize:20,
         fontWeight:'600',
    },
})