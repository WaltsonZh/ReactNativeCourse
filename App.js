import { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, SafeAreaView, TextInput, Button, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable } from 'react-native'

export default function App() {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onPressHandler = () => {
    setSubmitted((prevSubmitted) => !prevSubmitted)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.body}>
        <Text style={styles.text}>Please write your name:</Text>
        <TextInput style={styles.input} placeholder='e.g. John' onChangeText={(value) => setName(value)} />

        {/* <Button title={submitted ? 'Clear' : 'Submit'} onPress={onPressHandler} color='#f00'/> */}

        {/* <TouchableOpacity style={styles.button} onPress={onPressHandler} activeOpacity={0.5}>
          <Text style={styles.text}>{submitted ? 'Clear' : 'Submit'}</Text>
        </TouchableOpacity> */}

        {/* <TouchableHighlight style={styles.button} onPress={onPressHandler} underlayColor='#dddddd'>
          <Text style={styles.text}>{submitted ? 'Clear' : 'Submit'}</Text>
        </TouchableHighlight> */}

        {/* <TouchableWithoutFeedback style={styles.button} onPress={onPressHandler}>
          <Text style={styles.text}>{submitted ? 'Clear' : 'Submit'}</Text>
        </TouchableWithoutFeedback> */}

        <Pressable onPress={onPressHandler} hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }} android_ripple={{ color: '#00f' }} style={({ pressed }) => [{ backgroundColor: pressed ? '#dddddd' : '#00ff00' }, styles.button]}>
          <Text style={styles.text}>{submitted ? 'Clear' : 'Submit'}</Text>
        </Pressable>

        {submitted ? <Text style={styles.text}>You are registered as {name}</Text> : null}
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
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 50,
    // backgroundColor: '#00ff00',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
