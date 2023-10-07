import { StyleSheet, View, Image, Text, TextInput, Alert } from 'react-native'
import CustomButton from '../utils/CustomButton'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login(prop) {
  const { navigation } = prop
  const [name, setName] = useState('')
  const [age, setAge] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then((value) => {
        if (value !== null) {
          navigation.navigate('Home')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const setData = async () => {
    if (name.length === 0 || age.name === 0) {
      Alert.alert('Warning', 'Please write your data.')
    } else {
      try {
        var user = {
          Name: name,
          Age: age,
        }
        await AsyncStorage.setItem('UserData', JSON.stringify(user))
        navigation.navigate('Home')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../../assets/asyncstorage.png')} />
      <Text style={styles.text}>Async Storage</Text>
      <TextInput style={styles.input} placeholder='Enter your name' onChangeText={(value) => setName(value)} />
      <TextInput style={styles.input} placeholder='Enter your age' onChangeText={(value) => setAge(value)} />
      <CustomButton title='Login' color='#1eb900' onPressFunction={setData} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 120,
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
    marginTop: 10,
    marginBottom: 10,
  },
})
