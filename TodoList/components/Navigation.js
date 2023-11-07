import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import COLOR from '../assets/colors'
import Todo from '../screens/Todo'
import Done from '../screens/Done'

export default function Navigation() {
  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            const icons = {
              'To-Do': 'home',
              Done: 'gear',
            }
            return <Icon name={icons[route.name]} color={color} size={26} />
          },
          tabBarStyle: {
            backgroundColor: COLOR.PRIMARY_DARK,
            borderTopColor: COLOR.PRIMARY_DARK,
            borderWidth: 0,
            height: 60,
          },
          tabBarLabelStyle: { fontSize: 14 },
          tabBarActiveTintColor: COLOR.CONTENT,
          tabBarInactiveTintColor: COLOR.CONTENT,
          tabBarActiveBackgroundColor: COLOR.PRIMARY_LIGHT,
          tabBarItemStyle: { margin: 5, borderRadius: 5 },
          headerStyle: { backgroundColor: COLOR.PRIMARY_DARK },
          headerTintColor: COLOR.CONTENT,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'My Task'
        })}
      >
        <Tab.Screen name='To-Do' component={Todo} />
        <Tab.Screen name='Done' component={Done} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
