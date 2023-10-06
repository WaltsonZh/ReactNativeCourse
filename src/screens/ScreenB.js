import { StyleSheet, View, Text, Pressable } from 'react-native'
import GlobalStyle from '../utils/GlobalStyle'

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
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Screen B</Text>
      <Pressable style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })} onPress={onPressHandler}>
        <Text style={GlobalStyle.ButtonText}>Go Back to Screen A</Text>
      </Pressable>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>{itemName}</Text>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>ID: {itemId}</Text>
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
    margin: 10,
  },
})
