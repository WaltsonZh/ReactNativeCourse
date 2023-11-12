import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import STYLES from '../assets/styles'
import COLOR from '../assets/colors'

export default function Todo({ navigation }) {
  return (
    <View style={STYLES.body}>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Task')}}>
        <Icon name='plus' size={20} color={COLOR.CONTENT} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLOR.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 18,
    right: 18,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
    shadowOpacity: 0.3,
  },
})
