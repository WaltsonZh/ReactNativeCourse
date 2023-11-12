import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import COLOR from '../assets/colors'
import TabNavigator from './TabNavigator'
import Task from '../screens/Task'

export default function Navigation() {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLOR.PRIMARY_DARK },
          headerTintColor: COLOR.CONTENT,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name='My Tasks' component={TabNavigator} />
        <Stack.Screen name='Task' component={Task} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
