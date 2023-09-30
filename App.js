import { StyleSheet, Text, View, Button, Linking } from 'react-native'

export default function App() {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Just start learning react native</Text>
      <Button title='github repo' onPress={() => Linking.openURL('https://github.com/waltsonzh/reactnativecourse')}></Button>
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
  }
})
