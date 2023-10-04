import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, View, Text, Pressable } from 'react-native'

const Stack = createStackNavigator()

function ScreenA(prop) {
  const { navigation } = prop

  const onPressHandler = () => {
    navigation.navigate('Screen B')
    // navigation.replace('Screen B')
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen A</Text>
      <Pressable style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })} onPress={onPressHandler}>
        <Text style={styles.text}>Go to Screen B</Text>
      </Pressable>
    </View>
  )
}

function ScreenB(prop) {
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{ header: () => null }}
      >
        <Stack.Screen name='Screen A' component={ScreenA} />
        <Stack.Screen name='Screen B' component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
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
