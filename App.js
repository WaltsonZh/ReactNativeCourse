import { useState } from 'react'
import { StyleSheet, Text, View, Button, Linking } from 'react-native'

export default function App() {
  const [count, setCount] = useState(0)
  const [clicks, setClicks] = useState(0)

  const onClickhandler = () => {
    setCount((prevCount) => prevCount + 5)
    setClicks((prevClicks) => prevClicks + 1)
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{count}</Text>
      <Button title='add' onPress={onClickhandler}></Button>
      <Text style={styles.text}>You clicked {clicks} times</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10,
  },
})
