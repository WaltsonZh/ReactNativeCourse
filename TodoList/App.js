import { StatusBar, SafeAreaView, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import COLOR from './assets/colors'
import Home from './screens/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export default function App() {
  const Tab = createBottomTabNavigator()

  return (
    <>
      <SafeAreaView style={styles.body}>
        <StatusBar />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: COLOR.PRIMARY_DARK }} />
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLOR.BACKGROUND,
    flex: 1,
  },
})
