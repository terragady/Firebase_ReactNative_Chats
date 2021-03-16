import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from "react-native-elements"
import { db } from '../firebase'

const addChat = ({ navigation }) => {

  const [input, setInput] = useState("")
const createChat = async () => {
  await db.collection('chats').add({
    chatName: input
  }).then(()=>{
    navigation.goBack();
  }).catch((error) => alert(error))
}

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    })
  }, [navigation])
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter name of your chat:"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button onPress={createChat} title='Create new Chat' />
          </View>
  )
}

export default addChat

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  }

}
)
