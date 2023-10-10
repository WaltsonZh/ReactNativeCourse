import { StyleSheet, View, Image, Text, TextInput, Alert } from 'react-native'
import CustomButton from '../utils/CustomButton'
import { useState, useEffect } from 'react'
import * as SQLite from 'expo-sqlite'
import { useDispatch, useSelector } from 'react-redux'
import { selectAge, selectName, setAge, setName } from '../redux/users/userSlice'
import { useRef } from 'react'

export const db = SQLite.openDatabase('MainDB')

export default function Login(prop) {
  const { navigation } = prop
  const dispatch = useDispatch()
  const name = useSelector(selectName)
  const age = useSelector(selectAge)
  const nameInput = useRef(null)
  const ageInput = useRef(null)

  useEffect(() => {
    createDatabase()
    getData()
  }, [])

  const createDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Users(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(25), Age INTEGER)')
    })
  }

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length
          if (len > 0) {
            navigation.navigate('Home')
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const setData = async () => {
    if (name.length === 0 || age.length === 0) {
      Alert.alert('Warning', 'Please write your data.')
    } else {
      try {
        await db.transactionAsync(async (tx) => {
          await tx.executeSqlAsync('INSERT INTO Users (Name, Age) VALUES(?, ?)', [name, age])
        })
        nameInput.current.clear()
        ageInput.current.clear()
        navigation.navigate('Home')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <View style={styles.body}>
      {/* <Image style={styles.logo} source={require('../../assets/redux.png')} /> */}
      <Text style={styles.text}>Redux</Text>
      <TextInput style={styles.input} ref={nameInput} placeholder='Enter your name' onChangeText={(value) => dispatch(setName(value))} />
      <TextInput style={styles.input} ref={ageInput} placeholder='Enter your age' onChangeText={(value) => dispatch(setAge(value))} />
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
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 100,
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
