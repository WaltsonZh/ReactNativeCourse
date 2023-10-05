import { NavigationContainer } from '@react-navigation/native'
import ScreenA from './ScreenA'
import ScreenB from './ScreenB'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView, StatusBar } from 'react-native'

// const Tab = createBottomTabNavigator()
// const Tab = createMaterialBottomTabNavigator()
const Tab = createMaterialTopTabNavigator()

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
              let iconName
              if (route.name === 'Screen A') {
                iconName = 'android'
                size = focused ? 25 : 20
                color = focused ? '#f0f' : '#555'
              } else if (route.name === 'Screen B') {
                iconName = 'apple'
                size = focused ? 25 : 20
                color = focused ? '#f0f' : '#555'
              }
              return <FontAwesome name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: '#f0f',
            tabBarInactiveTintColor: '#555',
            tabBarActiveBackgroundColor: '#fff',
            tabBarInactiveBackgroundColor: '#999',
          })}
          inactiveColor='#888'
          activeColor='#f0edf6'
          barStyle={{ backgroundColor: '#694fad' }}
        >
          <Tab.Screen name='Screen A' component={ScreenA} />
          <Tab.Screen name='Screen B' component={ScreenB} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}
