import { NavigationContainer } from '@react-navigation/native'
import ScreenA from './src/ScreenA'
import ScreenB from './src/ScreenB'
import { createDrawerNavigator } from '@react-navigation/drawer'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'

const Drawer = createDrawerNavigator()

export default function App() {
  useFonts({
    AbrilFatface: require('./assets/fonts/AbrilFatface-Regular.ttf'),
    DancingScript: require('./assets/fonts/DancingScript-Regular.ttf'),
    IndieFlower: require('./assets/fonts/IndieFlower-Regular.ttf'),
  })

  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerPosition: 'left',
            drawerType: 'front',
            swipeEdgeWidth: 100,
            drawerHideStatusBarOnOpen: true,
            overlayColor: '#00000090',
            drawerStyle: {
              backgroundColor: '#e6e6e6',
              width: 250,
            },
            headerShown: true,
            swipeEnabled: true,
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
          initialRouteName='Screen A'
        >
          <Drawer.Screen
            name='Screen A'
            component={ScreenA}
            options={{
              title: 'Screen A title',
              drawerIcon: ({ focused }) => <FontAwesome name='android' size={focused ? 25 : 20} color={focused ? '#0000ff' : '#999999'} />,
            }}
          />
          <Drawer.Screen
            name='Screen B'
            component={ScreenB}
            options={{
              title: 'Screen B title',
              drawerIcon: ({ focused }) => <FontAwesome name='apple' size={focused ? 25 : 20} color={focused ? '#0000ff' : '#999999'} />,
            }}
            initialParams={{ itemName: 'Item from Screen A', itemId: 12 }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
