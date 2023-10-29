import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native'
import { Camera as ECamera, takePictureAsync } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useRef, useEffect, useState } from 'react'
import CustomButton from '../utils/CustomButton'

export default function Camera(prop) {
  const { navigation } = prop

  const cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
  const [photo, setPhoto] = useState()

  const captureHandle = async () => {
    try {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      }

      const newPhoto = await cameraRef.current.takePictureAsync(options)
      setPhoto(newPhoto)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      const cameraPermission = await ECamera.requestCameraPermissionsAsync()
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
      setHasCameraPermission(cameraPermission.status === 'granted')
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
      console.log(mediaLibraryPermission)
    })()
  }, [])

  if (photo) {
    const savePhoto = async () => {
      await MediaLibrary.saveToLibraryAsync(photo.uri)
      setPhoto(undefined)
    }

    return (
      <>
        <Image style={styles.photo} source={{ uri: 'data:image/jpg;base64,' + photo.base64 }} />
        {hasMediaLibraryPermission ? <CustomButton title='Save' style={{ alignSelf: 'center' }} color='#0080ff' onPressFunction={savePhoto} /> : null}
        <CustomButton title='Discard' style={{ alignSelf: 'center' }} color='#0080ff' onPressFunction={() => setPhoto(undefined)} />
      </>
    )
  }

  if (hasCameraPermission === undefined) {
    return <Text style={styles.text}>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text style={styles.text}>Permission for camera not granted. Please change this in settings.</Text>
  }

  return (
    <View style={styles.body}>
      <ECamera ref={cameraRef} style={styles.preview}>
        <CustomButton title='Capture' color='#1eb900' onPressFunction={() => captureHandle()} />
      </ECamera>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  text: {
    padding: 50,
    textAlign: 'center',
    fontSize: 40,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  photo: {
    alignSelf: 'stretch',
    flex: 1,
  },
})
