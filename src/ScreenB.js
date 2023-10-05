import { StyleSheet, View, Text, Pressable } from 'react-native'

export default function ScreenB(prop) {
  const { navigation } = prop

  const onPressHandler = () => {
    navigation.navigate('Screen A')
    // navigation.goBack()
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen B</Text>
      <Pressable style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })} onPress={onPressHandler}>
        <Text style={styles.text}>Go Back to Screen A</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
})
