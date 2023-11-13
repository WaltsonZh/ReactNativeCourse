import { useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTask, setTaskId, setTasks } from '../redux/taskSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import COLOR from '../assets/colors'
import STYLES from '../assets/styles'
import { FlatList } from 'react-native'
import { Text } from 'react-native'

export default function Todo({ navigation }) {
  const { tasks } = useSelector(selectTask)
  const dispatch = useDispatch()

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = async () => {
    try {
      const strTasks = await AsyncStorage.getItem('Tasks')
      const parsedTasks = JSON.parse(strTasks)
      if (parsedTasks && typeof parsedTasks === 'object') {
        dispatch(setTasks(parsedTasks))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.body}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => {
            dispatch(setTaskId(item.Id))
            navigation.navigate('Task')
          }}>
            <Text style={[STYLES.poppins, styles.title]} numberOfLines={1}>
              {item.Title}
            </Text>
            <Text style={[STYLES.poppins, styles.subtitle]} numberOfLines={1}>
              {item.Desc}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => {
          dispatch(setTaskId(tasks.length + 1))
          navigation.navigate('Task')
        }}
      >
        <Icon name='plus' size={20} color={COLOR.CONTENT} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
    padding: 10,
  },
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
  item: {
    backgroundColor: COLOR.PRIMARY_LIGHT,
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    marginHorizontal: 7,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
    shadowOpacity: 0.3,
  },
  title: {
    color: COLOR.CONTENT,
    fontSize: 30,
    padding: 5,
  },
  subtitle: {
    color: COLOR.CONTENT,
    fontSize: 20,
    padding: 5,
  },
})
