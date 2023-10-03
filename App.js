import { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, SafeAreaView, TextInput, Pressable, Modal, Image, ImageBackground } from 'react-native'
import CustomButton from './src/CustomButton'
import Header from './src/Header'

export default function App() {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const onPressHandler = () => {
    if (name.length > 3) {
      setSubmitted((prevSubmitted) => !prevSubmitted)
    } else {
      setShowWarning(true)
    }
  }

  return (
    <ImageBackground
      style={styles.body}
      source={{
        uri: 'https://cdn.pixabay.com/photo/2013/07/12/12/35/texture-145968_960_720.png',
      }}
    >
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <StatusBar />
        <View style={styles.body}>
          <Header />
          <Modal visible={showWarning} transparent onRequestClose={() => setShowWarning(false)} animationType='fade'>
            <View style={styles.centered_view}>
              <View style={styles.warning_modal}>
                <View style={styles.warning_title}>
                  <Text style={styles.text}>WARNING!</Text>
                </View>
                <View style={styles.warning_body}>
                  <Text style={styles.text}>The name must be longer than 3 characters</Text>
                </View>
                <Pressable style={styles.warning_button} onPress={() => setShowWarning(false)} android_ripple={{ color: '#fff' }}>
                  <Text style={styles.text}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Text style={styles.text}>Please write your name:</Text>
          <TextInput style={styles.input} placeholder='e.g. John' onChangeText={(value) => setName(value)} />
          <CustomButton onPressFunction={onPressHandler} title={submitted ? 'Clear' : 'Submit'} color='#0f0' />
          <CustomButton style={{ margin: 10 }} onPressFunction={onPressHandler} title='Test' color='#f0f' />
          {submitted ? (
            <View style={styles.body}>
              <Text style={styles.text}>You are registered as {name}</Text>
              <Image style={styles.image} source={require('./assets/done.png')} resizeMode='stretch' />
            </View>
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_960_720.png',
              }}
              resizeMode='stretch'
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  centered_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    height: 50,
    backgroundColor: '#0ff',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
})
