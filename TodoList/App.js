import { StatusBar, SafeAreaView } from 'react-native'
import COLOR from './assets/colors'
import STYLES from './assets/styles'
import Navigation from './components/Navigation'

export default function App() {
  return (
    <>
      <SafeAreaView
        style={[
          STYLES.body,
          {
            backgroundColor: COLOR.PRIMARY_DARK,
          },
        ]}
      >
        <StatusBar />
        <Navigation />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: COLOR.PRIMARY_DARK }} />
    </>
  )
}
