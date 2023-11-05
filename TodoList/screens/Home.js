import { View, Text, StyleSheet } from 'react-native'
import COLOR from '../assets/colors'

export default function Home() {
  return (
    <View style={styles.body}>
      <Text>Text</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND
  }
})
