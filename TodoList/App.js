import { useCallback } from 'react'
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import COLOR from './assets/colors'
import Navigation from './components/Navigation'
import { Animated } from 'react-native'

const av = new Animated.Value(0)
av.addListener(() => {
  return
})

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.body} onLayout={onLayoutRootView}>
        <StatusBar />
        <Navigation />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: COLOR.PRIMARY_DARK }} />
    </Provider>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_DARK,
  },
})
