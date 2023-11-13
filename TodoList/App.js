import { StatusBar, SafeAreaView, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import COLOR from './assets/colors'
import Navigation from './components/Navigation'
import { store } from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView
        style={[
          styles.body,
          {
            backgroundColor: COLOR.PRIMARY_DARK,
          },
        ]}
      >
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
    backgroundColor: COLOR.BACKGROUND,
  },
})
