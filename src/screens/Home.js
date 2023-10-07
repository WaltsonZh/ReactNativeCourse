import { StyleSheet, View, Text, Pressable, Alert, TextInput } from 'react-native'
import GlobalStyle from '../utils/GlobalStyle'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../utils/CustomButton'

export default function Home(prop) {
  const { navigation, route } = prop
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then((value) => {
        if (value !== null) {
          let user = JSON.parse(value)
          setName(user.Name)
          setAge(user.Age)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const updateData = async () => {
    if (name.length === 0) {
      Alert.alert('Warning', 'Please write your data.')
    } else {
      try {
        var user = {
          Name: name,
        }
        await AsyncStorage.mergeItem('UserData', JSON.stringify(user))
        Alert.alert('Success', 'Your data has been updated.')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const removeData = async () => {
    try {
      await AsyncStorage.clear()
      navigation.navigate('Login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Welcome {name} !</Text>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Your age is {age}</Text>
      <TextInput style={styles.input} value={name} onChangeText={(value) => setName(value)} />
      <CustomButton title='Update' color='#ff7f00' onPressFunction={updateData} />
      <CustomButton title='Remove' color='#f40100' onPressFunction={removeData} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    width: 300,
    height: 48,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10,
  },
})
