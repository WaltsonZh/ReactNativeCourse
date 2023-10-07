import { StyleSheet, Pressable, Text } from 'react-native'

export default function CustomButton(prop) {
  const { style, onPressFunction, title, color } = prop

  return (
    <Pressable
      onPress={onPressFunction}
      hitSlop={{
        top: 10,
        bottom: 10,
        right: 10,
        left: 10,
      }}
      android_ripple={{ color: '#00f' }}
      style={({ pressed }) => [{ backgroundColor: pressed ? '#dddddd' : color }, styles.button, {...style}]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 50,
    // backgroundColor: '#00ff00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
})
