import { StyleSheet, View, Image, Text, TextInput, Alert } from 'react-native'
import CustomButton from '../utils/CustomButton'
import { useState, useEffect } from 'react'
import * as SQLite from 'expo-sqlite'

export const db = SQLite.openDatabase('MainDB')

export default function Login(prop) {
  const { navigation } = prop
  const [name, setName] = useState('')
  const [age, setAge] = useState()

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
      // AsyncStorage.getItem('UserData').then((value) => {
      //   if (value !== null) {
      //     navigation.navigate('Home')
      //   }
      // })
      db.transaction((tx) => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length
          if (len > 0) {
            navigation.navigate('Home')
          }
          console.log(results.rows._array)
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
        // var user = {
        //   Name: name,
        //   Age: age,
        // }
        // await AsyncStorage.setItem('UserData', JSON.stringify(user))
        await db.transactionAsync(async (tx) => {
          await tx.executeSqlAsync('INSERT INTO Users (Name, Age) VALUES(?, ?)', [name, age])
        })
        navigation.navigate('Home')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../../assets/sqlite.png')} />
      <Text style={styles.text}>SQLite</Text>
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
    width: 200,
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
