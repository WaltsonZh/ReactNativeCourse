import { StyleSheet, View, Text, Alert, TextInput } from 'react-native'
import GlobalStyle from '../utils/GlobalStyle'
import { useEffect, useState } from 'react'
import CustomButton from '../utils/CustomButton'
import { db } from './Login'
import { useDispatch, useSelector } from 'react-redux'
import { selectName, selectAge, setName, setAge, increaseAge } from '../redux/users/userSlice'

export default function Home(prop) {
  const { navigation } = prop
  const dispatch = useDispatch()
  const name = useSelector(selectName)
  const age = useSelector(selectAge)

  // const [name, setName] = useState('')
  // const [age, setAge] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length
          if (len > 0) {
            var userName = results.rows.item(0).Name
            var userAge = results.rows.item(0).Age
            dispatch(setName(userName))
            dispatch(setAge(userAge))
          }
        })
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
        await db.transactionAsync(async (tx) => {
          await tx.executeSqlAsync('UPDATE Users SET Name = ? WHERE ID = 1', [name])
        })
        Alert.alert('Success', 'Your data has been updated.')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const removeData = async () => {
    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync('DELETE FROM Users')
        await tx.executeSqlAsync('DELETE FROM sqlite_sequence WHERE name = ?', ['Users'])
      })
      navigation.navigate('Login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Welcome {name} !</Text>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Your age is {age}</Text>
      <TextInput style={styles.input} value={name} onChangeText={(value) => dispatch(setName(value))} />
      <CustomButton title='Update' color='#ff7f00' onPressFunction={updateData} />
      <CustomButton title='Remove' color='#f40100' onPressFunction={removeData} />
      <CustomButton title='Increase Age' color='#0080ff' onPressFunction={() => dispatch(increaseAge())} />
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
