import { StyleSheet, View, Text, Pressable } from 'react-native'
import GlobalStyle from '../utils/GlobalStyle'

export default function ScreenA(prop) {
  const { navigation, route } = prop

  const onPressHandler = () => {
    navigation.navigate('Screen B')
    // navigation.toggleDrawer()
  }

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Screen A</Text>
      <Pressable style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })} onPress={onPressHandler}>
        <Text style={GlobalStyle.ButtonText}>Go to Screen B</Text>
      </Pressable>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>{route.params?.message}</Text>
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
