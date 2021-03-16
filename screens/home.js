import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from "../firebase"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

const home = ({ navigation }) => {

  const [chats, setChats] = useState([])

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    })
  }

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ))
    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Chat App',
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (<View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
          <Avatar
            rounded
            overlayContainerStyle={{ backgroundColor: auth?.currentUser?.photoURL || "grey" }}
            title={auth?.currentUser?.displayName ? auth.currentUser.displayName[0].toUpperCase() : "."} />
        </TouchableOpacity>
      </View>),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 80,
          marginRight: 20,
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
            <SimpleLineIcons name='pencil' size={24} color="black" />
          </TouchableOpacity>
        </View>
      )

    })
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({})
