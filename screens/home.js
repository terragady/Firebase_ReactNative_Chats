import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from "../firebase"

const home = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Chat App',
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => <View style={{ marginLeft: 20 }}>
        <TouchableOpacity>
          <Avatar
            rounded
            overlayContainerStyle={{ backgroundColor: auth?.currentUser?.photoURL || "black" }}
            title={auth?.currentUser?.displayName ? auth.currentUser.displayName[0].toUpperCase() : ""} />
        </TouchableOpacity>
      </View>

    })
  }, [])

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
