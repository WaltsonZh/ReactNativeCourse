import { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, SafeAreaView, TextInput } from 'react-native'

export default function App() {
  const [phone, setPhone] = useState('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.body}>
        <Text style={styles.text}>Please write your phone number:</Text>
        <TextInput style={styles.input} placeholder='e.g. John' onChangeText={(value) => setPhone(value)} secureTextEntry />
        <Text style={styles.text}>Your phone number is: {phone}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
})
