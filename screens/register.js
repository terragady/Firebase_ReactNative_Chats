import {StatusBar} from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useLayoutEffect(() => {
navigation.setOptions({
  headerBackTitle: "HALLLOS"
})
  }, [navigation])

  const register = () => { 
    auth.createUserWithEmailAndPassword(email,password)
    .then(authUser => {
      authUser.user.updateProfile({
        displayName: name,
        photoURL: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        
      })
    }).catch(error => alert(error.message))

  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autofocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="text"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button raised onPress={register} title="Register" />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems:"center",
    justifyContent: "center",
    padding: 10,
    backgroundColor:"white",
  },
  inputContainer: {
    width: 300,

  },
  button: {
    width: 200,
    marginTop: 10,
  }
})
