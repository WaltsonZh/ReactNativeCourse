import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home'
import Login from './screens/Login'
import { Animated, StatusBar, SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import { useDispatch } from 'react-redux'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { useEffect } from 'react'
import { setExpoPushToken, setNotification } from './redux/notifications/notificationSlices'
import { useRef } from 'react'
import Map from './screens/Map'
import Camera from './screens/Camera'

// ios weird error
// const av = new Animated.Value(0)
// av.addListener(() => {
//   return
// })

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const registerForPushNotificationsAsync = async () => {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  return token
}

const Stack = createStackNavigator()

export default function Main() {
  const [fontsLoaded, fontError] = useFonts({ DancingScript: require('../assets/fonts/DancingScript-Regular.ttf') })
  const dispatch = useDispatch()
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => dispatch(setExpoPushToken(token)))

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      dispatch(setNotification(notification))
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#0080ff' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#0080ff',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold',
              },
            }}
            initialRouteName='Login'
          >
            <Stack.Screen
              name='Login'
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Map' component={Map} />
            <Stack.Screen name='Camera' component={Camera} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  )
}
