import { useEffect, useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { selectTask, setTasks } from '../redux/taskSlice'
import STYLES from '../assets/styles'
import COLOR from '../assets/colors'
import CustomButton from '../components/CustomButton'
import { Alert } from 'react-native'

export default function Tasks({ navigation }) {
  const { tasks, taskId } = useSelector(selectTask)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    getTask()
  }, [])

  const getTask = () => {
    const Task = tasks.find((task) => task.Id === taskId)
    if (Task) {
      setTitle(Task.Title)
      setDesc(Task.Desc)
    }
  }

  const setTask = async () => {
    if (title.length == 0) {
      Alert.alert('Warning', 'Please write your task title.')
    } else {
      try {
        const Task = {
          Id: taskId,
          Title: title,
          Desc: desc,
        }

        const currentId = tasks.findIndex((task) => task.Id === taskId)
        let newTasks = []
        if (currentId > -1) {
          newTasks = [...tasks]
          newTasks[currentId] = Task
        } else {
          newTasks = [...tasks, Task]
        }

        await AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        dispatch(setTasks(newTasks))
        Alert.alert('Success!', 'Task saved successfully.')
        navigation.goBack()
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <View style={STYLES.body}>
      <TextInput value={title} style={styles.input} placeholder='Title' onChangeText={(value) => setTitle(value)}/>
      <TextInput value={desc} style={[styles.input, { height: 96 }]} placeholder='Description' multiline onChangeText={(value) => setDesc(value)} />
      <CustomButton title='Save Task' color={COLOR.PRIMARY_LIGHT} style={{ width: '100%', marginTop: 10 }} onPressFunction={setTask} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 32,
    borderWidth: 1,
    borderColor: COLOR.CONTENT,
    borderRadius: 5,
    backgroundColor: 'white',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
})
