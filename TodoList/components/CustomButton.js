import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import COLOR from '../assets/colors'

export default function CustomButton(prop) {
  const { style, onPressFunction, title, color } = prop

  return (
    <TouchableOpacity onPress={onPressFunction} android_ripple={{ color: COLOR.PRIMARY_LIGHT_ACTIVE }} style={[{ backgroundColor: color }, styles.button, { ...style }]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: COLOR.CONTENT,
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
})
