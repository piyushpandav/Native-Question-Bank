import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  const navigation = useNavigation();

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const Logins = () => {
    if (email !== '' && password !== '') {

      try {
        axios.post('https://interviewhub-3ro7.onrender.com/admin/login', {
          "email": email,
          "password": password,
        }).then(async(res) => {
          if (res.data) {
            alert('Sussefully Account Login!')
            setemail('')
            setpassword('')
           await AsyncStorage.setItem('User',JSON.stringify(res))
            navigation.navigate('Home')
          }
        }).catch((e)=>{
          console.log(e);
          alert('Create The Account')
          
        })
      } catch (error) {
        console.log(error)
      }

      // console.log(email)
      // console.log(password)


    } else {
      alert("Please Enter The Field!")
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={40} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Welcome Back Glad  </Text>
        <Text style={styles.text}>to see you, Again!</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
          onChangeText={setemail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#999"
          onChangeText={setpassword}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => Logins()}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>


      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SingUp')} >
          <Text style={styles.signUpText}>SingUp </Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  backButton: {
    marginBottom: 15,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',

  },
  form: {
    marginTop: 100,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  signUpText: {
    color: '#00000',
    // fontWeight: 'bold',
    fontWeight: '700',
    marginHorizontal: 4,
  },
}) 