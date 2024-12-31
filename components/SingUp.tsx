import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function SingUp() {
  const navigation = useNavigation();

  const [user, setuser] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")

  const Singup = () => {

    if (user !== "" && password !== "" && email !== "") {

      try {
        axios.post("https://interviewhub-3ro7.onrender.com/admin/signup", {
          "email": email,
          "password": password,
        }).then((res) => {
          if(res.data){

            alert("Sussefully Account Created!");
            setuser('')
            setemail('')
            setpassword('')
            navigation.navigate('Login')
          }
        }).catch((e) => {
          alert("Alredy Account Created!")
        })
      } catch (error) {
        console.log(error);

      }
      // console.log(user)
      // console.log(password)
      // console.log(email)

    } else {
      alert("Please Enter The Field!");
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
        <FontAwesome name="angle-left" size={40} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>Hello! Register to get  </Text>
        <Text style={styles.text}>started</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          onChangeText={setuser}
          value={user}
        />
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
        {/* <TextInput
          style={styles.input}
          placeholder="Conform Password"
          secureTextEntry={true}
          placeholderTextColor="#999"
        /> */}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => Singup()}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>


      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Alredy have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
          <Text style={styles.signUpText}>Login </Text>
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