import { useEffect, useState } from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { selectTask, setTasks } from '../redux/taskSlice'
import STYLES from '../assets/styles'
import COLOR from '../assets/colors'
import CustomButton from '../components/CustomButton'
import Checkbox from 'expo-checkbox'
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Modal } from 'react-native'

export default function Tasks({ navigation }) {
  const { tasks, taskId } = useSelector(selectTask)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [done, setDone] = useState(false)
  const [color, setColor] = useState('white')
  const [showModal, setShowModal] = useState(false)
  const [time, setTime] = useState('1')

  useEffect(() => {
    getTask()
  }, [])

  const getTask = () => {
    const Task = tasks.find((task) => task.Id === taskId)
    if (Task) {
      setTitle(Task.Title)
      setDesc(Task.Desc)
      setDone(Task.Done)
      setColor(Task.Color)
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
          Done: done,
          Color: color,
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
      <Modal visible={showModal} transparent onRequestClose={() => setShowModal(false)} animationType='fade' hardwareAccelerated>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <View style={styles.modalBody}>
              <Text style={styles.text}>Remind me After</Text>
              <TextInput style={styles.modalInput} keyboardType='numeric' value={time} onChangeText={(value) => setTime(value)} />
              <Text style={styles.text}>Minute(s)</Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowModal(false)
                }}
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  setShowModal(false)
                }}
              >
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TextInput value={title} style={styles.input} placeholder='Title' onChangeText={(value) => setTitle(value)} />
      <TextInput value={desc} style={[styles.input, { height: 96 }]} placeholder='Description' multiline onChangeText={(value) => setDesc(value)} />
      <View style={styles.colorBar}>
        <TouchableOpacity
          style={[
            styles.colorButtons,
            {
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
          ]}
          onPress={() => {
            setColor('#ffffff')
          }}
        >
          {color === '#ffffff' ? <Icon name='check' size={20} /> : ''}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.colorButtons,
            {
              backgroundColor: '#f28b82',
            },
          ]}
          onPress={() => {
            setColor('#f28b82')
          }}
        >
          {color === '#f28b82' ? <Icon name='check' size={20} /> : ''}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.colorButtons,
            {
              backgroundColor: '#aecbfa',
            },
          ]}
          onPress={() => {
            setColor('#aecbfa')
          }}
        >
          {color === '#aecbfa' ? <Icon name='check' size={20} /> : ''}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.colorButtons,
            {
              backgroundColor: '#ccff90',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}
          onPress={() => {
            setColor('#ccff90')
          }}
        >
          {color === '#ccff90' ? <Icon name='check' size={20} /> : ''}
        </TouchableOpacity>
      </View>
      <View style={styles.extraRow}>
        <TouchableOpacity
          style={styles.extraButtons}
          onPress={() => {
            setShowModal(true)
          }}
        >
          <Icon name='bell' color={COLOR.CONTENT} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.checkbox}>
        <Checkbox color={COLOR.CONTENT} value={done} onValueChange={(value) => setDone(value)} />
        <Text style={styles.text}>Is Done</Text>
      </View>
      <CustomButton
        title='Save Task'
        color={COLOR.PRIMARY_LIGHT}
        style={{
          width: '100%',
          marginTop: 10,
        }}
        onPressFunction={setTask}
      />
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
  colorBar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLOR.PRIMARY_LIGHT,
    margin: 10,
  },
  colorButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraRow: {
    flexDirection: 'row',
    padding: 10,
    gap: 20,
  },
  extraButtons: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_LIGHT,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  text: {
    fontSize: 20,
    color: COLOR.CONTENT,
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    height: 200,
    backgroundColor: COLOR.PRIMARY_LIGHT,
    borderRadius: 20,
  },
  modalBody: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    height: 50,
  },
  modalInput: {
    width: 50,
    borderWidth: 1,
    borderColor: COLOR.CONTENT,
    borderRadius: 10,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    margin: 10,
  },
  cancelButton: {
    flex: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderTopColor: COLOR.CONTENT,
    borderRightColor: COLOR.CONTENT,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: COLOR.CONTENT,
    borderLeftColor: COLOR.CONTENT,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
