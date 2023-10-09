import { NavigationContainer } from '@react-navigation/native'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

const Stack = createStackNavigator()

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ DancingScript: require('./assets/fonts/DancingScript-Regular.ttf') })

  return (
    <Provider store={store}>
      <SafeAreaProvider>
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
