import { StyleSheet, View, Text, Pressable } from 'react-native'

export default function ScreenB(prop) {
  const { navigation, route } = prop
  const { itemName, itemId } = route.params

  const onPressHandler = () => {
    navigation.navigate('Screen A', { message: 'message from B' })
    // navigation.goBack()
    // navigation.setParams({ itemId: 14 })
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen B</Text>
      <Pressable style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })} onPress={onPressHandler}>
        <Text style={styles.text}>Go Back to Screen A</Text>
      </Pressable>
      <Text style={styles.text}>{itemName}</Text>
      <Text style={styles.text}>ID: {itemId}</Text>
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
